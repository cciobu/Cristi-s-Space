# 🎛️ Ghid Administrator - Panoul de Administrare

## 🔐 Acces Admin

### Login
**URL:** `admin-login.html`

**Credențiale implicite:**
- **Username:** `cristi`
- **Password:** `Cristi@Space2026!`

⚠️ **IMPORTANT:** Schimbă aceste credențiale înainte de a lansa site-ul!

### Cum să schimbi credențialele

1. Deschide fișierul [admin-login.html](admin-login.html)
2. Găsește linia ~45-46 (în secțiunea JavaScript):
```javascript
const ADMIN_USERNAME = 'cristi';
const ADMIN_PASSWORD = 'Cristi@Space2026!';
```
3. Înlocuiește cu propriile credențiale
4. Salvează fișierul

---

## 📊 Funcționalități Dashboard

### 1. **Statistici generale**
- **Cereri noi** - număr de cereri de contact
- **Imagini portofoliu** - total imagini în galerie
- **Vizitatori** - necesită configurare Google Analytics

### 2. **📨 Gestionare Cereri Contact**

Cererile de contact sunt gestionate prin **Formspree**.

**Cum funcționează:**
1. Clientul completează formularul pe pagina Contact
2. Formspree primește cererea
3. Primești notificare prin email automat
4. Vezi toate cererile pe: https://formspree.io/forms/mvzbqnjz/submissions

**Notificări email:**
- Configurează-te în contul Formspree
- Adaugă mai multe adrese de email pentru notificări
- Setează răspunsuri automate

**Alternative pentru cereri:**
- **EmailJS** - gratuit, 200 emailuri/lună
- **Google Sheets** - salvează automat în spreadsheet
- **Backend propriu** - PHP, Node.js cu bază de date

### 3. **🖼️ Gestionare Portofoliu**

**Funcții disponibile:**
- ✅ Vizualizare toate imaginile din portofoliu
- ✅ Editare descrieri (alt text) pentru SEO
- ✅ Ștergere imagini din listă
- ✅ Upload imagini noi (interface)

**Cum să adaugi imagini în portofoliu:**

#### Metoda 1: Manual (recomandat acum)
1. Încarcă imaginea în folderul `/img`
2. Deschide [portofoliu.html](portofoliu.html)
3. Adaugă noul `<figure>` în galerie:
```html
<figure>
  <img src="img/nume-imagine.jpg" alt="Descriere SEO" loading="lazy">
  <figcaption>Titlu vizibil</figcaption>
</figure>
```
4. Actualizează și array-ul din [admin.js](admin.js) (linia 44-52)

#### Metoda 2: Prin Dashboard (interfață)
- Click pe zona de upload
- Selectează imaginea(ile)
- **Notă:** Pentru moment, aceasta doar arată preview
- Pentru funcționalitate completă, necesită backend (PHP/Node.js)

**Optimizare imagini înainte de upload:**
1. Redimensionează la max 1920px lățime
2. Comprimă cu https://tinypng.com (păstrează 60-80% calitate)
3. Convertește la WebP pentru performanță maximă
4. Redenumește fișierele descriptiv: `scara-metalica-moderna.jpg`

### 4. **⚙️ Setări**

**Schimbare parolă:**
- Interfața este pregătită
- Pentru funcționalitate completă, necesită backend
- Momentan, schimbă manual în `admin-login.html`

**Informații sistem:**
- Browser curent
- Data și ora login-ului
- Status sesiune

---

## 🔒 Securitate

### Măsuri implementate:

✅ **Sesiune cu timeout**
- Sesiunea expiră după 24 ore
- Logout automat la expirare

✅ **Blocat pentru motoare de căutare**
- Paginile admin au `<meta name="robots" content="noindex, nofollow">`
- `robots.txt` blochează crawlarea paginilor admin

✅ **Autentificare client-side**
- Verificare credențiale în JavaScript
- Sesiune salvată în `sessionStorage`

### ⚠️ Limitări sistem demo:

❌ **Nu este 100% sigur pentru producție!**

Acest sistem este **doar pentru demonstrație**. Pentru un site live, ai nevoie de:

1. **Backend real** - PHP, Node.js, Python
2. **Bază de date** - MySQL, PostgreSQL, MongoDB
3. **Autentificare server-side** - JWT, OAuth, Sessions
4. **HTTPS obligatoriu**
5. **Rate limiting** - prevenire brute force
6. **Hash parole** - bcrypt, Argon2

### 🛡️ Recomandări pentru producție:

**Opțiunea 1: CMS profesional**
- **WordPress** cu WooCommerce - cel mai popular
- **Strapi** - CMS headless modern
- **Netlify CMS** - gratuit pentru static sites

**Opțiunea 2: Backend custom**
```
Site Frontend (HTML/CSS/JS)
        ↓
Backend API (Node.js/PHP)
        ↓
Bază de date (MySQL)
        ↓
Admin Dashboard protejat
```

**Opțiunea 3: Firebase/Supabase**
- Autentificare gata făcută
- Bază de date în cloud
- Gratuit până la un anumit trafic
- Rapid de implementat

---

## 📱 Accesare Dashboard

### Desktop
1. Deschide `https://cristispace.com/admin-login.html`
2. Autentifică-te
3. Folosește tab-urile pentru navigare

### Mobile
- Dashboard-ul este responsive
- Funcționează perfect pe telefon/tabletă
- Recomand salvarea ca "Add to Home Screen"

---

## 🚨 Troubleshooting

### "Nu mă pot autentifica"
- Verifică dacă credențialele sunt corecte (case-sensitive)
- Verifică dacă JavaScript este activat
- Șterge cache-ul browserului
- Încearcă în modul incognito

### "Imaginile nu se încarcă în portofoliu"
- Verifică dacă fișierele există în `/img`
- Verifică calea în `admin.js` (linia 44-52)
- Verifică consola browser pentru erori (F12)

### "Sesiunea expiră prea repede"
- Sesiunea durează 24 ore implicit
- Modifică durata în `admin.js` linia 14:
```javascript
const sessionDuration = 24 * 60 * 60 * 1000; // 24 ore în milisecunde
```

### "Upload imagini nu funcționează"
- Normal! Este doar interfață pentru demo
- Pentru funcționalitate completă, adaugă imagini manual în `/img`
- Sau implementează backend pentru upload real

---

## 🔄 Actualizări viitoare recomandate

### Prioritate MARE:
1. ✅ Implementare backend pentru upload imagini
2. ✅ Integrare API Formspree pentru afișare cereri
3. ✅ Sistem real de autentificare (JWT)
4. ✅ Dashboard analytics (integrare Google Analytics API)

### Prioritate MEDIE:
5. ✅ Editare conținut text direct din dashboard
6. ✅ Backup automat portofoliu
7. ✅ Istoric modificări (audit log)
8. ✅ Multi-admin support (mai mulți utilizatori)

### Prioritate MICĂ:
9. ✅ Dark/Light mode toggle
10. ✅ Export date în CSV/PDF
11. ✅ Programare postări viitoare
12. ✅ Statistici detaliate (heatmaps, conversion rate)

---

## 📞 Suport

Pentru probleme tehnice sau întrebări:
- Email: contact@cristispace.com
- Telefon: +373 600 11 602

---

**Dashboard creat: Iulie 2026**
**Versiune: 1.0 (Demo)**
**Status: Funcțional pentru demonstrație, necesită backend pentru producție**

🎉 **Panoul de administrare este gata de folosit!**
