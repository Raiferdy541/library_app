let currentPage = 'home';
let currentBook = null;
let books = [];

const main = document.querySelector('main');

const pageListMainContent = `<h2 class="text-2xl font-bold mb-4">Daftar Buku Perpustakaan</h2>

<table class="min-w-full border border-gray-300">
  <thead>
    <tr>
      <th class="px-6 py-3 bg-gray-100 border-b text-left">Judul</th>
      <th class="px-6 py-3 bg-gray-100 border-b text-left">Penulis</th>
      <th class="px-6 py-3 bg-gray-100 border-b text-left">Tahun Terbit</th>
      <th class="px-6 py-3 bg-gray-100 border-b text-left">Jumlah</th>
      <th class="px-6 py-3 bg-gray-100 border-b text-center">Action</th>
    </tr>
  </thead>
  <tbody>
  </tbody>
</table>`;

const pageEditBookMainContent = `<h2 class="text-2xl font-bold mb-4">Edit Buku</h2>

<form class="max-w-sm mx-auto" onsubmit="return handleEditForm(event)">
</form>
`;

const pageAddBookMainContent = `<h2 class="text-2xl font-bold mb-4">Tambah Buku</h2>

<form class="max-w-sm mx-auto" onsubmit="return handleAddForm(event)">
  <div class="mb-4">
    <label for="title" class="block text-gray-700 font-semibold mb-2">Judul Buku</label>
    <input required type="text" id="title" name="title" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
  </div>
  <div class="mb-4">
    <label for="author" class="block text-gray-700 font-semibold mb-2">Penulis Buku</label>
    <input required type="text" id="author" name="author" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
  </div>
  <div class="mb-4">
    <label for="year" class="block text-gray-700 font-semibold mb-2">Tahun Terbit</label>
    <input required type="number" id="year" name="year" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
  </div>
  <div class="mb-4">
    <label for="quantity" class="block text-gray-700 font-semibold mb-2">Jumlah Stok</label>
    <input required type="number" id="quantity" name="quantity" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
  </div>
  <div class="flex justify-center">
    <input type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" value="Tambah Buku" />
  </div>
</form>
`;


async function handleClickEditButton(bookId) {
  try {
    
    // STEP 3.0.1 3.0.2 3.0.3
    const response = await fetch(`http://localhost:3333/books/${bookId}`)
    const hasil = await response.json();
    currentBook = hasil;

    // Ambil data buku dari server berdasarkan id, simpan hasilnya ke variabel currentBook
    // TODO: answer here

    currentPage = 'edit';
    loadPage();
  } catch (error) {
    console.log(error);
    console.log('Terjadi kesalahan saat mengambil data buku');
  }
}
async function handleClickDeleteButton(bookId) {
  try {
    // const confirmation = confirm('Apakah anda yakin ingin menghapus buku ini?');
    // if (!confirmation) {
    //   return;
    // }

    //panggil function deleteBook dengan parameter bookId
    // TODO: answer here

    await deleteBook(bookId);


    loadPage();
  } catch (error) {
    console.log(error);
    console.log('Terjadi kesalahan saat menghapus buku');
  }
}

async function handleEditForm(event) { // STEP 3.1 3.1.1 3.1.2 3.1.3 3.1.4
  try {
    // gunakan preventDefault untuk mencegah browser melakukan reload halaman
    // TODO: answer here

    event.preventDefault();

    /* 
      Ambil data dari form, simpan ke dalam variabel book
      bentuknya seperti ini:
      {
        title: 'example judul',
        author: 'example penulis',
        year: 2020,
        quantity: 10,
      }
    */
    // TODO: answer here

    let book = { // cek lagi
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        year: document.getElementById('year').value,
        quantity: document.getElementById('quantity').value,
    }

    // panggil function editBook dengan parameter book
    // TODO: answer here

    await editBook(book);

    currentBook = null;

    currentPage = 'home';
    loadPage();
  } catch (error) {
    console.log(error);
    console.log('Terjadi kesalahan saat mengubah buku');
  }
}

async function handleAddForm(event) { // STEP 2.1
  try {
    
    // gunakan preventDefault untuk mencegah browser melakukan reload halaman
    // TODO: answer here


    // STEP 2.1.2
    event.preventDefault();

     /*
      Ambil data dari form, simpan ke dalam variabel book
      bentuknya seperti ini:
      {
        title: 'example judul',
        author: 'example penulis',
        year: 2020,
        quantity: 10,
      }
    */
    // TODO: answer here

    // STEP 2.1.3
    let book = {
      // ngambil value dari html form dari value yang dihasilkan di id title (untuk make value harus ada req input di htmlnya)
        title: document.getElementById('title').value, 
        author: document.getElementById('author').value,
        year: document.getElementById('year').value,
        quantity: document.getElementById('quantity').value,
    }

    // STEP 2.1.4
    await addBook(book);

    // panggil function addBook dengan parameter book
    // TODO: answer here


    currentPage = 'home';
    loadPage();
  } catch (error) {
    console.log(error);
    console.log('Terjadi kesalahan saat menambah buku');
  }
}

function handleClickAddNav() { // STEP 2.0.1 2.0.2
  // ubah currentPage menjadi 'add'
  currentPage = 'add'
  // TODO: answer here
  loadPage();
}

// add event listener click tag a didalam li dengan function handleClickAddNav
const navLinks = document.querySelectorAll('li a');

// const clickHandler = () => {
//   alert("Hello world");
// };

navLinks.forEach((navLink) => {
  // STEP 2.0.3
  // cek lagi
  navLink.addEventListener("click", () => 
  handleClickAddNav() // addeventlistener pake kurawal ngaruh
);
  // TODO: answer here
});

function generateRows(books) { // STEP 1.3
  let rows = '';
  if (books.length === 0) {
    rows = `<tr>
   <td colspan="6" class="px-6 py-4 border-b text-center">Tidak ada buku yang ditemukan</td>
</tr>`;
  } else {
      
      books.forEach(element => {

        dataHtml = `<tr class="book-item">
        <td class="px-6 py-4 border-b">${element.title}</td>
        <td class="px-6 py-4 border-b">${element.author}</td>
        <td class="px-6 py-4 border-b">${element.year}</td>
        <td class="px-6 py-4 border-b">${element.quantity}</td>
        <td class="px-6 py-4 border-b text-center">
          <button class="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onclick="handleClickEditButton(${element.id})">Edit</button>
          <button class="inline-block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onclick="handleClickDeleteButton(${element.id})">Hapus</button>  
        </td>
      </tr> `
      rows = rows + dataHtml;

      });

    // looping books, untuk setiap book, buat row seperti ini:
      
    /*
      Jangan lupa untuk ganti BookId dengan id dari book yang sedang di looping
      simpan row yang dibuat ke variabel rows
    */

    // TODO: answer here
  }
  return rows;
}

function generateEditFormInput() {
  return `<div class="mb-4">
  <label for="title" class="block text-gray-700 font-semibold mb-2">Judul Buku</label>
  <input required type="text" id="title" name="title" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" value="${currentBook?.title}">
</div>
<div class="mb-4">
  <label for="author" class="block text-gray-700 font-semibold mb-2">Penulis Buku</label>
  <input required type="text" id="author" name="author" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" value="${currentBook?.author}">
</div>
<div class="mb-4">
  <label for="year" class="block text-gray-700 font-semibold mb-2">Tahun Terbit</label>
  <input required type="number" id="year" name="year" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" value="${currentBook?.year}">
</div>
<div class="mb-4">
  <label for="quantity" class="block text-gray-700 font-semibold mb-2">Jumlah Stok</label>
  <input required type="number" id="quantity" name="quantity" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" value="${currentBook?.quantity}">
</div>
<div class="flex justify-center">
  <input type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" value="simpan" />
</div>`;
}

async function loadPage() { // STEP 3.0.5 Cek lagi
  switch (currentPage) {
    case 'home':
      // panggil function fetchBooks
      // TODO: answer here
      
      await fetchBooks(); // STEP 1.4

      main.innerHTML = pageListMainContent;

      const tableBody = document.querySelector('tbody');
      /* 
        panggil function generateRows dengan parameter books dan simpan hasilnya ke variabel rows
        kemudian isi innerHTML dari tableBody dengan rows
      */
      // TODO: answer here

      rows = generateRows(books);
      tableBody.innerHTML = rows;


      break;
    case 'edit':
      main.innerHTML = pageEditBookMainContent;

      const form = document.querySelector('form');

      /* 
        panggil function generateEditFormInput dan simpan hasilnya ke variabel formInput
        kemudian isi innerHTML dari form dengan formInput
      */
      // TODO: answer here

      formInput = generateEditFormInput();
      form.innerHTML = formInput;

      break;
    case 'add':
      main.innerHTML = pageAddBookMainContent;
      break;
  }
}

async function fetchBooks() { // STEP 1.1 1.2
  try {
    /* 
      fetch data buku dari http://localhost:3333/books
      simpan hasilnya ke variabel global books
    */
    // TODO: answer here

    const response = await fetch('http://localhost:3333/books');
    books =  await response.json();

    return books;

  } catch (error) {
    console.log(error);
    console.log('Terjadi kesalahan saat mengambil data buku');
  }
}

async function addBook(book) {
  try {
    // STEP 2.1.5

    const response = await fetch('http://localhost:3333/books',{
      method : 'POST',
      body : JSON.stringify(book),
      headers : {'Content-Type': 'application/json'}
    })

    const hasil = await response.json()
    return hasil;
    
    /* 
      tambahkan buku baru ke http://localhost:3333/books dengan method POST
      body yang dikirim adalah book yang dikirimkan sebagai parameter function
    */
    // TODO: answer here
  } catch (error) {
    console.log(error);
    console.log('Terjadi kesalahan saat menambah buku');
  }
}

async function editBook(book) {
  try {
    /* 
      ubah buku yang ada di http://localhost:3333/books/:id dengan method PUT
      body yang dikirim adalah book yang dikirimkan sebagai parameter function
    */
    // TODO: answer here

    const response = await fetch(`http://localhost:3333/books/${currentBook.id}`,{
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(book),
      method: 'PUT',
    })
    const hasil = await response.json()

    return hasil;


  } catch (error) {
    console.log(error);
    console.log('Terjadi kesalahan saat mengubah buku');
  }
}

async function deleteBook(bookId) {
  try {
    /* 
      hapus buku yang ada di http://localhost:3333/books/:id dengan method DELETE
      id buku yang akan dihapus dikirimkan sebagai parameter function
    */
    // TODO: answer here

    const response = await fetch(`http://localhost:3333/books/${bookId}`, {
      method : 'DELETE'
    })
    const hasil = await response.json()
    return hasil;

  } catch (error) {
    console.log(error);
    console.log('Terjadi kesalahan saat menghapus buku');
  }
}

loadPage();
