// TODO: delete | 0
export function muladd_loop(xlen: i32, start: i32, end: i32, Y: i32, i: i32, c: i32): i32 {
    var hy = (Y >>> 14);
    var ly = (Y & 0x3fff);

    for (var j = start; j < end; j++) {
        // <<2 because each i32 uses 4 bytes of memory
        var x_j = load<i32>(j << 2);                // x[j]
        var w_ji = load<i32>((j + i + xlen) << 2);  // w[j + i]

        var hx = (x_j >>> 14);
        var lx = (x_j & 0x3fff);
        var cross = (hx * ly + lx * hy) | 0;
        lx = (((w_ji | 0) + lx * ly +
            ((cross & 0x3fff) << 14)) | 0) + c;
        c = ((lx >>> 28) + hx * hy +
            (cross >>> 14)) | 0;

        store<i32>((j + i + xlen) << 2, lx & 0xfffffff);  // w[j + i]
    }

    return c;
}
