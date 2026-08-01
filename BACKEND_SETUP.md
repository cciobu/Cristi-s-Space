# Backend PHP pentru Admin Dashboard

## 📁 Fișiere Create:

```
/api/
├── login.php           - Autentificare admin
├── save-project.php    - Salvare modificări proiecte
└── upload-image.php    - Upload imagini pe server
```

## 🚀 Instalare Backend:

### OPȚIUNEA 1: Server Local (Dezvoltare)

**A. Cu XAMPP (Windows):**
1. Descarcă XAMPP: https://www.apachefriends.org/
2. Instalează XAMPP
3. Copiază tot folderul site-ului în `C:\xampp\htdocs\cristispace\`
4. Pornește Apache din XAMPP Control Panel
5. Deschide: `http://localhost/cristispace/admin-login.html`

**B. Cu PHP Built-in Server (Rapid):**
```bash
cd "C:\Users\cristian.ciobu\Desktop\alt site"
php -S localhost:8000
```
Apoi deschide: `http://localhost:8000/admin-login.html`

### OPȚIUNEA 2: Hosting Live (Producție)

1. **Cumpără hosting PHP** (recomandări):
   - Hostinger (~2-3 EUR/lună)
   - Bluehost (~3-4 EUR/lună)
   - SiteGround (~5-6 EUR/lună)

2. **Upload fișiere prin FTP:**
   - Folosește FileZilla sau FTP client
   - Încarcă TOT folderul site-ului
   - Asigură-te că `/api/` are permisiuni 755

3. **Testează:**
   - Deschide: `https://taudomeniu.com/admin-login.html`
   - Modificările vor fi LIVE instant!

## ⚙️ Configurare:

### Permisiuni Foldere (Important!)

```bash
chmod 755 api/
chmod 644 api/*.php
chmod 755 img/
chmod 755 proiecte/
chmod 644 proiecte/*.html
```

### Securitate:

1. **Schimbă credentialele** în `api/login.php`:
```php
$ADMIN_USERNAME = 'tau_username';
$ADMIN_PASSWORD = 'ParolaTareComplexă123!';
```

2. **Adaugă .htaccess pentru protecție:**
```apache
# În /api/.htaccess
<Files "*.php">
    Order Allow,Deny
    Allow from all
</Files>
```

## 🧪 Testare Backend:

### Test 1: Verifică PHP funcționează
Crează `test.php` în root:
```php
<?php
phpinfo();
?>
```
Deschide: `http://localhost:8000/test.php`

### Test 2: Test API Login
```bash
curl -X POST http://localhost:8000/api/login.php \
  -H "Content-Type: application/json" \
  -d '{"username":"cristi","password":"Cristi@Space2026!"}'
```

Ar trebui să vezi: `{"success":true,...}`

### Test 3: Test Upload Imagine
1. Login în admin dashboard
2. Editează un proiect
3. Schimbă imagine principală
4. Verifică în folderul `/img/` - ar trebui să apară noua imagine

## 💡 Cum Funcționează:

### Flow Salvare Proiect:

```
1. User editează proiect în admin dashboard
2. Click "💾 Salvează"
3. JavaScript trimite date către api/save-project.php
4. PHP actualizează fișierul HTML din /proiecte/
5. Modificările sunt LIVE instant pe site!
6. Nicio bază de date necesară - direct în fișiere
```

### Flow Upload Imagine:

```
1. User selectează imagine în editor
2. JavaScript trimite fișier către api/upload-image.php
3. PHP salvează imaginea în /img/ cu nume unic
4. Returnează URL: img/project_1234567_abc.jpg
5. JavaScript actualizează preview
6. La salvare proiect, URL-ul imaginii se salvează în HTML
```

## 🔧 Troubleshooting:

### Eroare: "Neautorizat"
- Sesiunea PHP nu funcționează
- Soluție: Verifică că `session_start()` funcționează

### Eroare: "Eroare la salvare"
- Permisiuni fișiere greșite
- Soluție: `chmod 644 proiecte/*.html`

### Eroare: "Eroare la upload imagine"
- Folder /img/ nu are permisiuni write
- Soluție: `chmod 755 img/`

### Backend nu răspunde
- Apache nu este pornit
- Soluție: Pornește Apache în XAMPP sau rulează `php -S localhost:8000`

## 🎯 Ce Se Întâmplă Fără Backend:

Dacă nu instalezi PHP backend, sistemul funcționează în **MOD DEMO**:
- ✅ Poți edita tot în interfață
- ✅ Vezi preview-uri
- ❌ Modificările NU se salvează permanent
- ❌ Se pierd la refresh browser

Mesajul în admin va arăta clar când ești în mod demo vs mod live.

## 📚 Next Steps:

1. **Instalează XAMPP** sau pornește PHP server
2. **Testează** admin dashboard
3. **Editează un proiect** și salvează
4. **Verifică** pagina proiectului - ar trebui să vezi modificările!

## 🎉 Rezultat Final:

Cu backend instalat, ai un **CMS complet funcțional**:
- ✅ Editare live text
- ✅ Upload imagini pe server
- ✅ Salvare automată în HTML
- ✅ Modificări instant pe site
- ✅ Fără bază de date necesară

**E ca și cum ai WordPress, dar mult mai simplu și rapid!**
