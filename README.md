# Shopify Theme Setup

Aceasta tema este construita ca tema Shopify Online Store 2.0, cu homepage, colectie, produs si cos.

## Structura

- `layout/theme.liquid` - layout-ul principal al temei
- `sections/header.liquid` - header-ul cu cautare, meniu si iconuri
- `sections/hero-promo.liquid` - bannerul mare de homepage
- `sections/category-grid.liquid` - grila de categorii
- `sections/promo-products.liquid` - slider/grila pentru noutati
- `sections/main-collection-product-grid.liquid` - pagina de colectie
- `sections/main-product.liquid` - pagina de produs
- `sections/main-cart.liquid` - pagina de cos
- `sections/footer.liquid` - footer-ul mare cu coloane si social
- `assets/base.css` - styling complet desktop + mobile
- `assets/theme.js` - meniu mobil, tabs produs, quantity selector, add-to-cart AJAX

## Instalare in Shopify

1. Deschide admin Shopify.
2. Mergi la `Online Store > Themes`.
3. Foloseste `Add theme > Upload zip file`.
4. Arhiveaza continutul acestui folder si urca arhiva in Shopify.

## Dupa upload

1. Configureaza logo-ul din header si footer.
2. Alege meniul principal in sectiunea Header.
3. Seteaza imaginea hero si colectia pentru sectiunea Noutati pe homepage.
4. Configureaza linkurile sociale din Theme settings.
5. Adauga imagini pentru blocurile de categorii din editorul temei.

## Observatie

Tema este construita intr-o directie vizuala foarte apropiata de referintele trimise, dar nu ca replica 1:1 a unui site existent.