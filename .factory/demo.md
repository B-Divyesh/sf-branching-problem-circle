# Demo sandbox

Open `/?demo=1` or `/demo` to enter the one-click sample circle. The primary landing action points to `/?demo=1`.

The sample is an original hexagon-corner problem. It includes three approaches, six anonymous votes, two written reasons, one alternative idea, and an opened hint/path.

Demo data is stored only in IndexedDB database `branching-problem-circle-demo`. Real circles use `branching-problem-circle`; the two databases never share a record. **Reset demo** replaces the demo database record with the shipped sample. **Start for real** deletes the demo record before returning to `/`; the sample is seeded again on the next demo visit. It never copies sample data to the real database.
