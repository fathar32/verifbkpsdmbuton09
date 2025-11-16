const form = document.getElementById('verifikasiForm');
const hasilDiv = document.getElementById('hasil');
// Ganti dengan URL Railway backend Anda
const API_URL = "https://railwaybkpsdmbuton-production.up.railway.app/api/verfikasi";

document.getElementById("verifikasiForm").addEventListener("submit", async (e) => {
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  hasilDiv.innerHTML = '<div class="error">⏳ Sedang memverifikasi...</div>';

  const nomorSurat = document.getElementById("nomorSurat").value;
  const namaPegawai = document.getElementById("namaPegawai").value;
  const nomorSurat = document.getElementById('nomorSurat').value;
  const namaPegawai = document.getElementById('namaPegawai').value;

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nomorSurat, namaPegawai })
    });

    const data = await res.json();
    const data = await response.json();

    if (data.verified) {
      document.getElementById("hasil").className = "success";
      document.getElementById("hasil").innerText = data.message;
      hasilDiv.innerHTML = `
        <div class="card">
          <h3>✅ Dokumen Terverifikasi</h3>
          <p><strong>Nomor Surat:</strong> ${data.data.nomor_surat}</p>
          <p><strong>Tanggal Surat:</strong> ${data.data.tanggal_surat || '-'}</p>
          <p><strong>Perihal:</strong> ${data.data.perihal || '-'}</p>
          <hr>
          <p><strong>Nama Pegawai:</strong> ${data.data.nama_pegawai}</p>
          <p><strong>NIP:</strong> ${data.data.nip || '-'}</p>
          <p><strong>Jabatan:</strong> ${data.data.jabatan || '-'}</p>
          <p><strong>Unit Kerja:</strong> ${data.data.unit_kerja || '-'}</p>
        </div>
      `;
    } else {
      document.getElementById("hasil").className = "error";
      document.getElementById("hasil").innerText = data.message;
      hasilDiv.innerHTML = `
        <div class="error">❌ ${data.message}</div>
      `;
    }
  } catch (err) {
    console.error(err);
    document.getElementById("hasil").className = "error";
    document.getElementById("hasil").innerText = "Gagal menghubungi server.";
    hasilDiv.innerHTML = `
      <div class="error">⚠️ Terjadi kesalahan koneksi ke server Railway.</div>
    `;
  }
});


0 commit comments
Comments
0
 (0)
Comment
You're not receiving notifications from this thread.

Update script.js · fathar32/verifbkpsdmbuton09@45f4f36 
