#!/usr/bin/env python3
# Dependencies:
# sudo apt install firefox-geckodriver chromium-chromedriver python3-selenium
import os
import time
import subprocess
from tempfile import TemporaryDirectory
from selenium import webdriver

URL = r"http://localhost:8000/bench-vjsc.html"
BENCH_RULE = "bench-vjsc"
LAST_BENCH = "NaorYung"
COMMITS = (
    "db76b0c80c9d0905d6189cc2bd72608d809a8cba",  # original VJSC
    "0b18485d00303505e1fa088bf6d829e92791c523",  # .splice()
    "4e88b29012be34e59271e2c4d6120d7eb6802862",  # for loop
)


def main():
    for driver in iter_drivers():
        server = None
        try:
            for commit in COMMITS:
                with TemporaryDirectory() as d:
                    # d = d.name
                    print(d)

                    subprocess.call(["git", "worktree", "add", d, commit])
                    subprocess.call(["make", "-C", d, BENCH_RULE])
                    server = subprocess.Popen(
                        ["python3", "-m", "http.server"],
                        cwd=os.path.join(d, BENCH_RULE),
                    )
                    with open(
                        driver.capabilities["browserName"] + commit + ".html", "w"
                    ) as f:
                        time.sleep(1)  # XXX: hack - wait for server
                        print(run_tests(driver), file=f)

                    server.terminate()
                    server = None
        finally:
            driver.quit()
            if server:
                server.terminate()


def iter_drivers():
    yield webdriver.Firefox()
    yield webdriver.Chrome()


def run_tests(driver):
    driver.get(URL)
    while True:
        status = driver.find_element_by_id(LAST_BENCH).text.strip().lower()
        if not status.startswith("waiting") and not status.startswith("computing"):
            break
        time.sleep(5)
    return driver.page_source


if __name__ == "__main__":
    main()
