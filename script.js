const API_URL = "railwaybkpsdmbuton-production.up.railway.app";

document.getElementById("verifikasiForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const nomorSurat = document.getElementById("nomorSurat").value;
  const namaPegawai = document.getElementById("namaPegawai").value;

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nomorSurat, namaPegawai })
    });

    const data = await res.json();

    if (data.verified) {
      document.getElementById("hasil").className = "success";
      document.getElementById("hasil").innerText = data.message;
    } else {
      document.getElementById("hasil").className = "error";
      document.getElementById("hasil").innerText = data.message;
    }
  } catch (err) {
    console.error(err);
    document.getElementById("hasil").className = "error";
    document.getElementById("hasil").innerText = "Gagal menghubungi server.";
  }
});
