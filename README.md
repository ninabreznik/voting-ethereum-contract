# voting-ethereum-contract

## tutorial
How to build and deploy a dapp for voting on proposals and minting tokens for the winner

1. The [slides](https://slides.com/ninabreznik/deck-11-12#/) give you an overview
2. The [gist](https://gist.github.com/serapath/2bf3c8833eac0814cf3aa1672217b6fb) contains all relevant source code and detailed instructions
3. You can open [remix](https://remix-alpha.ethereum.org/) and load the gist files by using remix terminal to execute:
    * `remix:loadgist 2bf3c8833eac0814cf3aa1672217b6fb`
4. At the end clone this repository (frontend of your DApp)

## develop
```sh
git clone https://github.com/ninabreznik/voting-ethereum-contract.git
cd voting-ethereum-contract
npm install
npm start
```

## build & publish
```sh
npm run build
git add -A && git commit -m "bundle"
git push
```
