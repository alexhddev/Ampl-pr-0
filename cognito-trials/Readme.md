Notes:

Use Ts-node for node 22:
```
node --loader ts-node/esm --no-warnings=ExperimentalWarning src/index.ts
```

Run natively with node:
```
node --experimental-strip-types --experimental-transform-types --no-warnings src/test.ts
```