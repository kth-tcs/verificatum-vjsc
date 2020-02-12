// XXX: use m4 to replace macros in original muladd code
// XXX: this code can be also generated using m4 from the original javascript implementation
/**
 * @description Implementation of muladd_loop() in AssemblyScript.
 *
 * Please see {@link verificatum.li.muladd_loop} for more information about
 * muladd.
 *
 * The w and x input arrays need to be written into WebAssembly's linear memory
 * to be accessed by this function. Starting from the start of the memory, write
 * x and then write w right after. w is modified in place.
 *
 * @param xlen Length of array to be scaled.
 * @param start Start index into x.
 * @param end End index into x.
 * @param Y Scalar.
 * @param i Index into w.
 * @param c Input carry.
 * @return Finally carry.
 */
export function muladd_loop(xlen: i32, start: i32, end: i32, Y: i32, i: i32, c: i32): i32 {
    var hy = (Y >>> 14);
    var ly = (Y & 0x3fff);

    for (var j = start; j < end; j++) {
        // <<2 because each i32 uses 4 bytes of memory
        var x_j = load<i32>(j << 2);                // x[j]
        var w_ji = load<i32>((j + i + xlen) << 2);  // w[j + i]

        var hx = (x_j >>> 14);
        var lx = (x_j & 0x3fff);
        var cross = hx * ly + lx * hy;
        lx = w_ji + lx * ly + ((cross & 0x3fff) << 14) + c;
        c = (lx >>> 28) + hx * hy + (cross >>> 14);

        store<i32>((j + i + xlen) << 2, lx & 0xfffffff);  // w[j + i]
    }

    return c;
}

export function main(): i32 {
	return muladd_loop(0, 10, 25, 1250, 0, 0);
}
