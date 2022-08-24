const template = document.createElement('template');
template.innerHTML = `
  <style>
  .user-card {
    text-align: center;
    background: #e5cf00;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 10px;
    margin-bottom: 15px;
    border-bottom: #540707 5px solid;
  }
  .user-card img {
    width: 150px;
    height: 200px;
  }
  .user-card button {
    cursor: pointer;
    background: #540707;
    color: #e5cf00;
    border: 2px solid white;
    border-radius: 5px;
    padding: 5px 10px; 
    margin-left: auto;
    margin-bottom:.75rem;
  }
  .info{
    display: none;
  }
  h1 {
    color: #540707;
    font-size: 2rem;
  }
  p[class='comment'] {
    color: #540707;
    font-size: 1.5rem;
  }
  div[class='info']{
    color: #540707;
    font-size: 1rem;
  }
  </style>
  <div class='user-card'>
    <img />
    <div>
      <h1></h1>
      <p class='comment'></P>
      <div class='info'>
        <p class='phone'></p>
        <p class='email'></P>
      </div>
      <button id='toggle-info'>Show Contact Info</button>
    </div>
  </div>
`;

class UserCard extends HTMLElement {
  constructor() {
    super();

    this.showInfo = false;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector('h1').innerText = this.getAttribute('name');
    this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');
    this.shadowRoot.querySelector('p[class="comment"]').innerText =
      this.getAttribute('comment');
    this.shadowRoot.querySelector('p[class="phone"]').innerText =
      this.getAttribute('phone');
    this.shadowRoot.querySelector('p[class="email"]').innerText =
      this.getAttribute('email');
  }

  toggleInfo() {
    this.showInfo = !this.showInfo;

    const info = this.shadowRoot.querySelector('.info');
    const toggleBtn = this.shadowRoot.querySelector('#toggle-info');

    if (this.showInfo) {
      info.style.display = 'block';
      toggleBtn.innerHTML = 'Hide Contact Info';
    } else {
      info.style.display = 'none';
      toggleBtn.innerHTML = 'Show Contact Info';
    }
  }

  connectedCallback() {
    this.shadowRoot
      .querySelector('#toggle-info')
      .addEventListener('click', () => this.toggleInfo());
  }
  disconnectedCallback() {
    this.shadowRoot.querySelector('#toggle-info').removeEventListener();
  }
}

window.customElements.define('user-card', UserCard);
