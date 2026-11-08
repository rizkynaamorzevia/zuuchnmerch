// ===== Data produk (ubah di sini) =====
const produk = [
  { nama: "Genshin Impact Figure - Venti", harga: 700000, kat: "Figure", foto: "VentiFigure.jpeg" },
  { nama: "Genshin Impact Figure - Zhongli", harga: 700000, kat: "Figure", foto: "ZhongliFigure.jpeg" },
  { nama: "Genshin Impact Figure - Ei", harga: 700000, kat: "Figure", foto: "EiFigure.jpeg" },
  { nama: "Genshin Impact Figure - Nahida", harga: 700000, kat: "Figure", foto: "foto/NahidaFigure.jpeg" },
  { nama: "Genshin Impact Figure - Furina", harga: 700000, kat: "Figure", foto: "foto/FurinaFigure.jpeg" },
  { nama: "Genshin Impact Figure - Mavuika", harga: 700000, kat: "Figure", foto: "foto/MavuikaFigure.jpeg" },
  { nama: "Genshin Impact Figure - Hutao", harga: 700000, kat: "Figure", foto: "foto/Hutao.jpeg" },
  { nama: "Genshin Impact Figure - Wanderer", harga: 700000, kat: "Figure", foto: "foto/Wawan.jpeg" },
  { nama: "Genshin Impact Costume - Lohen", harga: 1500000, kat: "Costume", foto: "foto/LohenCos.jpeg" },
  { nama: "Genshin Impact Costume - Lauma", harga: 1500000, kat: "Costume", foto: "foto/LaumaCos.jpeg" },
  { nama: "Genshin Impact Costume - Sandrone", harga: 1500000, kat: "Costume", foto: "foto/SandroneCos.jpeg" },
  { nama: "Genshin Impact Costume - Odette", harga: 1500000, kat: "Costume", foto: "foto/OdetteCos.jpeg" },
  { nama: "Strinova Poster - Fragrans", harga: 20000, kat: "Poster", foto: "foto/Fragrans.jpg" },
  { nama: "Strinova Poster - Lawine", harga: 20000, kat: "Poster", foto: "foto/Lawine.jpg" },
  { nama: "Strinova PhoneStrap - Kanami", harga: 10000, kat: "Aksesoris", foto: "foto/phonestrapkanami.jpeg" },
  { nama: "Strinova PhoneStrap - Kokona", harga: 10000, kat: "Aksesoris", foto: "foto/phonestrapkokona.jpeg" },
  { nama: "Strinova Keychain - Kanami", harga: 35000, kat: "Aksesoris", foto: "foto/keychainkanami.jpeg" },
  { nama: "Strinova Keychain - Flavia", harga: 35000, kat: "Aksesoris", foto: "foto/keychainflavia.jpeg" },
  { nama: "Strinova Keychain - Michele", harga: 35000, kat: "Aksesoris", foto: "foto/keychainmichele.jpeg" }
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

tampilProduk("produk-unggulan", produk.slice(0, 4));
tampilProduk("semua-produk", produk);


function filter(kat, tombol) {
  tampilProduk("hasil", kat == "Semua" ? produk : produk.filter(p => p.kat == kat));
  document.querySelectorAll(".filter .btn").forEach(b => b.classList.remove("aktif"));
  tombol.classList.add("aktif");
}
const kat = new URLSearchParams(location.search).get("kat") || "Semua";
const tombolKat = [...document.querySelectorAll(".filter .btn")].find(b => b.textContent == kat);
if (tombolKat) filter(kat, tombolKat);

