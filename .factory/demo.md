# Demo sandbox

Open `/demo` or `/?demo=1` to enter the one-click sample circle. The primary landing action points to `/demo`.

The sample is an original hexagon-corner problem. It includes three approaches, six anonymous votes, two written reasons, one alternative idea, and an opened hint/path.

Demo data is stored only in IndexedDB database `branching-problem-circle-demo`. Real circles use `branching-problem-circle`; the two databases never share a record. **Reset demo** replaces the demo database record with the shipped sample. **Start for real** returns to `/` and discards access to the demo namespace; it never copies sample data to the real database.
