# Auto-Lam

Site web d'Auto-Lam, location de voitures à Dakar (Next.js 15, React 19, Tailwind CSS 4).
Les réservations et messages de contact sont envoyés au numéro WhatsApp de l'agence ; il n'y a pas de backend.

## Développement

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de production
npm run lint
```

## Modifier les contenus

Toutes les données métier se trouvent dans **`src/lib/data.ts`** :

- `business` : numéro WhatsApp, téléphone, email, adresse, horaires
- `carModels` : véhicules, catégories, prix/jour (`null` = « sur demande »), photos par couleur
- `chauffeurFeePerDay` et `deliveryLocations` : frais de chauffeur et de livraison

La flotte, le formulaire de réservation, l'estimation de prix, la page contact et le pied de page lisent tous ce fichier.

## Déploiement

Définir `NEXT_PUBLIC_SITE_URL` (ex. `https://autolam.sn`) pour que les aperçus de partage (Open Graph) utilisent le bon domaine.
