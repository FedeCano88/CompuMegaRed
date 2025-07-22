document.addEventListener('DOMContentLoaded', () => {
  const socket = io();

  const form = document.getElementById('product-form');
  const list = document.getElementById('products-list');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    const newProduct = {
      title: formData.get('title'),
      description: formData.get('description'),
      code: formData.get('code'),
      price: formData.get('price'),
      stock: formData.get('stock'),
      category: formData.get('category'),
      thumbnails: formData.get('thumbnails'),
    };

    console.log('Enviando producto:', newProduct); // DEBUG

    socket.emit('new-product', newProduct);
    form.reset();
  });

list.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const id = e.target.dataset.id;
    console.log(`Click en eliminar producto ID: ${id}`);
    socket.emit('delete-product', id); // sin parseInt
  }
});

  socket.on('products-updated', (products) => {
    list.innerHTML = '';
    products.forEach(p => {
      let imgTag = '';
      if (p.thumbnails && p.thumbnails[0]) {
        imgTag = `<img src="${p.thumbnails[0]}" alt="${p.title}" style="width:100px;height:auto;margin-right:10px;">`;
      } else {
        imgTag = `<img src="/images/placeholder.png" alt="Sin imagen" style="width:100px;height:auto;margin-right:10px;">`;
      }

      list.innerHTML += `
        <li>
          <div style="display:flex;align-items:center;">
            ${imgTag}
            <strong>${p.title}</strong> - ${p.description} - $${p.price}
          </div>
          <button class="delete-btn" data-id="${p._id}">Eliminar</button>
        </li>`;
    });
  });
});



