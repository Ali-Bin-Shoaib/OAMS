## Prisma update command

```bash
npm i --save-dev prisma@latest
npm i @prisma/client@latest
```

## Reset Database command

```bash
npx prisma migrate reset
```

## Configuration for handling images.

```tsx
export const config = {
	api: {
		bodyParser: false,
	},
};
```
