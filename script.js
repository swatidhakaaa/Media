// Dummy Movies Data
const moviesData = {
  trending: [
    { id: 1, title: "Stranger Things", img: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=500&auto=format&fit=crop", desc: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments." },
    { id: 2, title: "Cyberpunk World", img: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=500&auto=format&fit=crop", desc: "A mercenary searching for a unique implant that is the key to immortality." },
    { id: 3, title: "Dark Horizon", img: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=500&auto=format&fit=crop", desc: "Astronauts voyage through a wormhole in space in an attempt to ensure humanity's survival." },
    { id: 4, title: "Neon Nights", img: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=500&auto=format&fit=crop", desc: "In a futuristic metropolis, a detective tracks down rouge synthetic humans." },
    { id: 5, title: "The Last Kingdom", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=500&auto=format&fit=crop", desc: "Saxons and Vikings fight for control of Britain in ancient times." }
  ],
  popular: [
    { id: 6, title: "Cosmic Odyssey", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=500&auto=format&fit=crop", desc: "Exploring distant galaxies and uncharted extra-terrestrial life." },
    { id: 7, title: "Shadow Rogue", img: "https://images.unsplash.com/photo-1514539079130-25950c84af65?q=80&w=500&auto=format&fit=crop", desc: "A master assassin seeks redemption after being betrayed by his league." },
    { id: 8, title: "Urban Beats", img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=500&auto=format&fit=crop", desc: "Street dancers fight for recognition and unity in the heart of the city." },
    { id: 9, title: "Ocean Deep", img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=500&auto=format&fit=crop", desc: "A deep-sea research team faces unexpected creatures at the bottom of the trench." }
  ],
  action: [
    { id: 10, title: "Speed Demon", img: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=500&auto=format&fit=crop", desc: "Underground racers team up to pull off a dangerous heist." },
    { id: 11, title: "Iron Siege", img: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=500&auto=format&fit=crop", desc: "A fortress comes under attack by mechanical futuristic warriors." },
    { id: 12, title: "Wild West", img: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=500&auto=format&fit=crop", desc: "An outlaw seeks revenge across the dusty plains of the old frontier." }
  ]
};

// DOM Elements
const navbar = document.getElementById('navbar');
const trendingRow = document.getElementById('trendingRow');
const popularRow = document.getElementById('popularRow');
const actionRow = document.getElementById('actionRow');
const searchInput = document.getElementById('searchInput');

const modal = document.getElementById('movieModal');
const closeModalBtn = document.getElementById('closeModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalVideo = document.getElementById('modalVideo');
const heroPlayBtn = document.getElementById('heroPlayBtn');

// 1. Navbar Scroll Effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('nav-black');
  } else {
    navbar.classList.remove('nav-black');
  }
});

// 2. Render Movie Cards into Rows
function renderRow(container, movies) {
  container.innerHTML = '';
  movies.forEach(movie => {
    const card = document.createElement('div');
    card.classList.add('poster-card');
    card.innerHTML = `
      <img src="${movie.img}" alt="${movie.title}" />
      <div class="poster-info">
        <strong>${movie.title}</strong>
      </div>
    `;
    card.addEventListener('click', () => openModal(movie));
    container.appendChild(card);
  });
}

// Initial Rendering
renderRow(trendingRow, moviesData.trending);
renderRow(popularRow, moviesData.popular);
renderRow(actionRow, moviesData.action);

// 3. Modal Functionality
function openModal(movie) {
  modalTitle.textContent = movie.title;
  modalDesc.textContent = movie.desc;
  modal.style.display = 'flex';
  modalVideo.play().catch(() => {}); // Play video automatically if supported
}

closeModalBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  modalVideo.pause();
});

// Close modal when clicking outside content
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    modalVideo.pause();
  }
});

// Hero Play Button Action
heroPlayBtn.addEventListener('click', () => {
  openModal({
    title: "Stranger Things",
    desc: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl."
  });
});

// 4. Search Filter
searchInput.addEventListener('input', (e) => {
  const query = e.target.value.toLowerCase();
  
  const filterMovies = (list) => list.filter(m => m.title.toLowerCase().includes(query));

  renderRow(trendingRow, filterMovies(moviesData.trending));
  renderRow(popularRow, filterMovies(moviesData.popular));
  renderRow(actionRow, filterMovies(moviesData.action));
});