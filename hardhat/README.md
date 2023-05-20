<center>
<img src="https://raw.githubusercontent.com/Kajot-dev/blockchain-contest/2a5241dea75c6983ecb591c9216387fec42085f7/blockchain-contest-front/public/2forge.svg"  width="60%" height="30%">
</center>

# Komendy

## Start

Instalacja modułów przez yarn:
```
npm install --global yarn
yarn install
```
Po zainstalowaniu modułów, należy wykonać następujące komendy startowe w folderze `../hardhat`:
```
yarn hardhat node
```
Pozostaw terminal otwarty. Na osobnym terminalu wpisz, aby uruchomić pierwszy etap scenariusza:
```
yarn run-base
```
W tym momencie mamy do dyspozycji:
* 4 sklepy
* 4 kolekcje (po 1 na sklep)
* 12 przedmiotów (w każdej kolekcji po 3)
* 12 ofert z poszczególnymi NFT

## Dalszy scenariusz

Teraz pozostaje dokończyć scenariusz jedną z opcji:
```
yarn mp-cancel # Usunięcie oferty
yarn mp-buy # Kupno wszystkich ofert
yarn mp-update # Nadpisanie oferty z nową ceną i czasem
```
## Narzędzia użytkowe
```
yarn block # Zwraca aktualny numer bloku
```

## Uwagi
W przypadku awarii, należy zatrzymać proces `node`, uruchomić go ponownie i powtórzyć `run-base`.
