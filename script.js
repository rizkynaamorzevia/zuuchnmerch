const produk = [
  { nama: "Genshin Impact Figure - Venti", harga: 700000, kat: "Figure", foto: "VentiFigure.jpeg" },
  { nama: "Genshin Impact Figure - Zhongli", harga: 700000, kat: "Figure", foto: "ZhongliFigure.jpeg" },
  { nama: "Genshin Impact Figure - Ei", harga: 700000, kat: "Figure", foto: "EiFigure.jpeg" },
  { nama: "Genshin Impact Figure - Nahida", harga: 700000, kat: "Figure", foto: "NahidaFigure.jpeg" },
  { nama: "Genshin Impact Figure - Furina", harga: 700000, kat: "Figure", foto: "FurinaFigure.jpeg" },
  { nama: "Genshin Impact Figure - Mavuika", harga: 700000, kat: "Figure", foto: "MavuikaFigure.jpeg" },
  { nama: "Genshin Impact Figure - Hutao", harga: 700000, kat: "Figure", foto: "Hutao.jpeg" },
  { nama: "Genshin Impact Figure - Wanderer", harga: 700000, kat: "Figure", foto: "Wawan.jpeg" },
  { nama: "Genshin Impact Costume - Lohen", harga: 1500000, kat: "Costume", foto: "LohenCos.jpeg" },
  { nama: "Genshin Impact Costume - Lauma", harga: 1500000, kat: "Costume", foto: "LaumaCos.jpeg" },
  { nama: "Genshin Impact Costume - Sandrone", harga: 1500000, kat: "Costume", foto: "SandroneCos.jpeg" },
  { nama: "Genshin Impact Costume - Odette", harga: 1500000, kat: "Costume", foto: "OdetteCos.jpeg" },
  { nama: "Strinova Poster - Fragrans", harga: 20000, kat: "Poster", foto: "Fragrans.jpg" },
  { nama: "Strinova Poster - Lawine", harga: 20000, kat: "Poster", foto: "Lawine.jpg" },
  { nama: "Strinova PhoneStrap - Kanami", harga: 10000, kat: "Aksesoris", foto: "phonestrapkanami.jpeg" },
  { nama: "Strinova PhoneStrap - Kokona", harga: 10000, kat: "Aksesoris", foto: "phonestrapkokona.jpeg" },
  { nama: "Strinova Keychain - Kanami", harga: 35000, kat: "Aksesoris", foto: "keychainkanami.jpeg" },
  { nama: "Strinova Keychain - Flavia", harga: 35000, kat: "Aksesoris", foto: "keychainflavia.jpeg" },
  { nama: "Strinova Keychain - Michele", harga: 35000, kat: "Aksesoris", foto: "keychainmichele.jpeg" }
];


const menu = [["Home", "index.html"], ["Products", "products.html"], ["Collection", "collection.html"], ["About Us", "about.html"], ["Contact", "contact.html"]];
const halaman = location.pathname.split("/").pop() || "index.html";

document.body.insertAdjacentHTML("afterbegin", `
<header><div class="nav">
  <a href="index.html"><img src="zukashoplogo.png?v=2" alt="ZuuChnMerch"></a> 
  <button id="tombol-menu">☰</button>
  <nav class="menu">${menu.map(m => `<a href="${m[1]}" class="${m[1] == halaman ? 'aktif' : ''}">${m[0]}</a>`).join("")}</nav>
</div></header>`);

document.body.insertAdjacentHTML("beforeend", `
<footer>© 2026 ZuuChnMerch<br>Instagram @zuuchn_ · WhatsApp 0821-8468-4045</footer>`);

document.body.insertAdjacentHTML("beforeend", `
<button id="tombol-keranjang" onclick="bukaKeranjang()">🛒<span id="jumlah">0</span></button>
<div id="panel-keranjang">
  <div class="panel-atas"><b>Keranjang</b><button onclick="bukaKeranjang()">✕</button></div>
  <div id="isi-keranjang"></div>
  <div class="panel-bawah">
    <p>Total: <b id="total">Rp 0</b></p>
    <a class="btn" id="pesan" target="_blank">Pesan via WhatsApp</a>
  </div>
</div>`);

document.getElementById("tombol-menu").onclick = () => document.querySelector(".menu").classList.toggle("buka");

let keranjang = JSON.parse(localStorage.getItem("cart")) || [];

function simpan() {
  localStorage.setItem("cart", JSON.stringify(keranjang));
  const rp = n => "Rp " + n.toLocaleString("id-ID");
  const total = keranjang.reduce((a, k) => a + k.harga * k.qty, 0);

  document.getElementById("jumlah").textContent = keranjang.reduce((a, k) => a + k.qty, 0);
  document.getElementById("total").textContent = rp(total);
  document.getElementById("isi-keranjang").innerHTML = keranjang.length
    ? keranjang.map((k, i) => `
      <div class="item">
        <span>${k.nama}<br><small>${k.qty} x ${rp(k.harga)}</small></span>
        <button onclick="hapus(${i})">🗑</button>
      </div>`).join("")
    : "<p>Keranjang kosong</p>";

  const teks = "Halo ZuuChnMerch, saya mau pesan:\n" +
    keranjang.map(k => `- ${k.nama} x${k.qty}`).join("\n") + "\nTotal: " + rp(total);
  document.getElementById("pesan").href = "https://wa.me/6282184684045?text=" + encodeURIComponent(teks);
}

function tambah(i) {
  const p = produk[i];
  const ada = keranjang.find(k => k.nama == p.nama);
  ada ? ada.qty++ : keranjang.push({ nama: p.nama, harga: p.harga, qty: 1 });
  simpan();
}

function hapus(i) { keranjang.splice(i, 1); simpan(); }
function bukaKeranjang() { document.getElementById("panel-keranjang").classList.toggle("buka"); }

simpan();

function tampilProduk(id, daftar) {
  const el = document.getElementById(id);
  if (!el) return;
  el.innerHTML = daftar.map(p => `
    <div class="kartu">
      <img src="${p.foto}" alt="${p.nama}" onerror="this.src='zukashoplogo.png'">
      <h3>${p.nama}</h3>
      <p class="harga">Rp ${p.harga.toLocaleString("id-ID")}</p>
      <button class="btn" onclick="tambah(${produk.indexOf(p)})">+ Keranjang</button>
    </div>`).join("");
}

tampilProduk("produk-unggulan", produk.slice(0, 3));
tampilProduk("semua-produk", produk);


function filter(kat, tombol) {
  tampilProduk("hasil", kat == "Semua" ? produk : produk.filter(p => p.kat == kat));
  document.querySelectorAll(".filter .btn").forEach(b => b.classList.remove("aktif"));
  tombol.classList.add("aktif");
}
const kat = new URLSearchParams(location.search).get("kat") || "Semua";
const tombolKat = [...document.querySelectorAll(".filter .btn")].find(b => b.textContent == kat);
if (tombolKat) filter(kat, tombolKat);

document.head.insertAdjacentHTML("beforeend", '<link rel="stylesheet" href="tambahan.css">');
const t = document.createElement("script");
t.src = "tambahan.js";
document.body.appendChild(t);

// ===== Pengaturan (ubah di sini) =====
const CONFIG = {
  pemilik: "Zukaa",
  email: "zukaachan13@gmail.com",
  wa: "6282184684045",
  website: "https://rizkynaamorzevia.github.io/zuuchnmerch/",
  shopee: "https://shopee.co.id/zukaashopp",
  ig: "https://instagram.com/zuuchn_"
};

const artikel = [
  { file: "artikel1.html", judul: "Cara Merawat Figure Anime Agar Awet", ringkas: "Figure kesayanganmu bisa awet bertahun-tahun kalau dirawat dengan benar. Yuk simak tips sederhananya." },
  { file: "artikel2.html", judul: "Tips Memilih Costume Cosplay yang Pas Untuk Pemula", ringkas: "Salah ukuran itu bikin kecewa. Ini cara memilih costume untuk pemula supaya pas dan nyaman dipakai." },
  { file: "artikel3.html", judul: "Comic Frontier yang di adakan di ICEBSD akan hadir pada 2027 mendatang", ringkas: "Kabar baik bagi penggemar anime, manga, cosplay, dan budaya pop Jepang, karena acara serupa dijadwalkan hadir pada Mei 2027" }
];
const kartuArtikel = () => artikel.map(a => `
  <div class="kartu">
    <h3><a href="${a.file}">${a.judul}</a></h3>
    <p>${a.ringkas}</p>
    <a class="btn" href="${a.file}">Read More</a>
  </div>`).join("");

const aktif = (...f) => f.some(x => halaman.startsWith(x)) ? "aktif" : "";
document.querySelector(".menu").innerHTML = `
  <a href="index.html" class="${aktif("index")}">Home</a>
  <div class="dd">
    <a href="products.html" class="${aktif("products", "collection")}">Products ▾</a>
    <div class="dd-isi">
      <a href="products.html">Semua Produk</a>
      <a href="collection.html?kat=Figure">Figure</a>
      <a href="collection.html?kat=Costume">Costume</a>
      <a href="collection.html?kat=Poster">Poster</a>
      <a href="collection.html?kat=Aksesoris">Aksesoris</a>
    </div>
  </div>
  <a href="artikel.html" class="${aktif("artikel")}">Artikel</a>
  <a href="gallery.html" class="${aktif("gallery")}">Gallery</a>
  <div class="dd">
    <a href="about.html" class="${aktif("about")}">About Us ▾</a>
    <div class="dd-isi">
      <a href="about.html">Profil</a>
      <a href="about.html#sejarah">Sejarah</a>
      <a href="about.html#visi">Visi &amp; Misi</a>
      <a href="about.html#struktur">Struktur</a>
    </div>
  </div>
  <a href="registration.html" class="${aktif("registration")}">Registration</a>
  <a href="contact.html" class="${aktif("contact")}">Contact</a>`;

document.querySelector("header").insertAdjacentHTML("afterend",
  `<div class="marquee"><span>✨ Selamat datang di ZuuChnMerch ✨ Your Favorite Anime &amp; Gaming Merchandise Store ✨ Pesan lewat WhatsApp atau Shopee ✨</span></div>`);

document.querySelector("footer").insertAdjacentHTML("beforeend", `
  <br>Desain by ${CONFIG.pemilik} · Website resmi: <a href="${CONFIG.website}">${CONFIG.website.replace("https://", "")}</a> · <a href="${CONFIG.shopee}" target="_blank">Shopee</a>`);

if (halaman == "index.html") {
  const main = document.querySelector("main");
  const konten = document.createElement("div");
  konten.className = "konten";
  while (main.firstChild) konten.appendChild(main.firstChild);
  main.appendChild(konten);
  main.classList.add("dengan-sidebar");

  konten.insertAdjacentHTML("beforeend", `
    <section><h2>📢 Pengumuman</h2>
      <div class="pengumuman">Website ZuuChnMerch resmi meluncur! Pesanan diproses lewat Shopee dan Whatsapp.</div>
      <div class="pengumuman">Chat kami untuk cek stok dan ongkir sebelum memesan.</div>
    </section>
    <section><h2>Artikel Terbaru</h2><div class="grid">${kartuArtikel()}</div></section>`);

  let kunjungan = (Number(localStorage.getItem("kunjungan")) || 0) + 1;
  localStorage.setItem("kunjungan", kunjungan);

  main.insertAdjacentHTML("beforeend", `
    <aside>
      <div class="widget"><h3>🕒 Jam</h3><div id="jam"></div></div>
      <div class="widget"><h3>👤 Profil Pemilik</h3>
        <p><b>${CONFIG.pemilik}</b><br>Pemilik ZuuChnMerch, penggemar anime &amp; game.<br>
        <a href="${CONFIG.ig}" target="_blank" rel="noopener">@zuuchn_</a></p>
      </div>
      <div class="widget"><h3>📊 Statistik</h3><p>Jumlah kunjungan: <b>${kunjungan}</b></p></div>
    </aside>`);

  const jam = () => {
    const d = new Date();
    document.getElementById("jam").innerHTML =
      `<b>${d.toLocaleTimeString("id-ID")}</b><br><small>${d.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</small>`;
  };
  jam(); setInterval(jam, 1000);
}

const daftarArtikel = document.getElementById("daftar-artikel");
if (daftarArtikel) daftarArtikel.innerHTML = kartuArtikel();

const galeri = document.getElementById("galeri");
if (galeri) galeri.innerHTML = produk.map(p => `
  <a href="${p.foto}" target="_blank"><img src="${p.foto}" alt="${p.nama}" title="${p.nama}" loading="lazy" onerror="this.src='zukashoplogo.png'"></a>`).join("");


if (halaman == "about.html") {
  document.querySelector("main").insertAdjacentHTML("beforeend", `
    <section id="sejarah"><h2>Sejarah</h2>

      <p>ZuuChnMerch berdiri sejak Mei 2026 dari kecintaan pada anime dan game. Kini kami hadir lewat Instagram, Shopee, dan website ini.</p></section>
      <section id="visi"><h2>Visi</h2>
      <p>Menjadi toko merchandise anime &amp; game favorit para penggemar di Indonesia.</p>
      <h2 style="margin-top:20px">Misi</h2>
      <ul style="margin-left:20px">
        <li>Menyediakan merchandise berkualitas dengan harga terjangkau.</li>
        <li>Memberikan pelayanan yang ramah dan cepat.</li>
        <li>Mengemas pesanan dengan aman sampai ke tangan pembeli.</li>
      </ul></section>
    <section><h2>Tujuan</h2>
      <p>Memudahkan penggemar anime &amp; game mendapatkan merchandise favorit mereka dalam satu tempat.</p></section>
    <section id="struktur"><h2>Struktur Organisasi</h2>
      <div class="struktur">
        <div><b>${CONFIG.pemilik}</b><br>Pemilik</div>
        <div><b>Admin</b><br>Layanan Pelanggan</div>
        <div><b>Tim Packing</b><br>Pengemasan &amp; Pengiriman</div>
      </div></section>`);
  if (location.hash) document.querySelector(location.hash)?.scrollIntoView();
}

if (halaman == "contact.html") {
  const email = document.querySelector('input[name="email"]');
  if (email && !document.querySelector('input[name="institusi"]'))
    email.insertAdjacentHTML("afterend", '<input type="text" name="institusi" placeholder="Institusi (sekolah/kampus/komunitas)" required>');
  document.querySelector("main h1").insertAdjacentHTML("afterend",
    `<p>Email: <b>${CONFIG.email}</b> · <a href="${CONFIG.shopee}" target="_blank" rel="noopener">Shopee</a></p>`);
  window.kirimWA = function (e) {
    e.preventDefault();
    const f = e.target;
    const teks = `Halo ZuuChnMerch, saya ${f.nama.value} (${f.email.value}) dari ${f.institusi ? f.institusi.value : "-"}. ${f.pesan.value}`;
    window.open(`https://wa.me/${CONFIG.wa}?text=` + encodeURIComponent(teks));
  };
}

function daftarWA(e) {
  e.preventDefault();
  const f = e.target;
  const teks = `Halo ZuuChnMerch, saya ingin daftar sebagai ${f.jenis.value}.\nNama: ${f.nama.value}\nEmail: ${f.email.value}\nNo HP: ${f.hp.value}\nKota: ${f.kota.value}`;
  window.open(`https://wa.me/${CONFIG.wa}?text=` + encodeURIComponent(teks));
}
