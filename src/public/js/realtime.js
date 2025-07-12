
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
      thumbnails: [formData.get('thumbnails')],
    };

    socket.emit('new-product', newProduct);
    form.reset();
  });

  list.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
      const id = e.target.dataset.id;
      socket.emit('delete-product', parseInt(id));
    }
  });

  socket.on('productos', (productos) => {
    list.innerHTML = '';
    productos.forEach(prod => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div style="display:flex;align-items:center;">
          <img src="${prod.thumbnails?.[0] || 'https://via.placeholder.com/100x100?text=Sin+Imagen'}" alt="${prod.title}" style="width:100px;height:auto;margin-right:10px;">
          <strong>${prod.title}</strong> - ${prod.description} - $${prod.price}
        </div>
        <button class="delete-btn" data-id="${prod.id}">Eliminar</button>
      `;
      list.appendChild(li);
    });
  });
});
