document.addEventListener("DOMContentLoaded", () => {

/*----------------------------------------------------------------------Sidebar Toggle-------------------------------------------------------------------------*/
const sidebar = document.querySelector(".sidebar");
const sidebarToggler = document.querySelector(".sidebar-toggler");
const menuToggler = document.querySelector(".menu-toggler");

sidebarToggler?.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
});

menuToggler?.addEventListener("click", () => {
    sidebar.classList.toggle("expanded");
});

/*----------------------------------------------------------------------Vinyl Popup-------------------------------------------------------------------------*/
const modal = document.getElementById("vinylModal");
const closeModalBtn = document.getElementById("closeModal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalArtist = document.getElementById("modalArtist");
const modalPrice = document.getElementById("modalPrice");

let selectedVinyl = null;

const vinyls = document.querySelectorAll(".vinyl");
vinyls.forEach(vinyl => {
    vinyl.addEventListener("click", () => {
        const img = vinyl.querySelector("img")?.src || "";
        const title = vinyl.querySelector("h3")?.textContent || "";
        const artist = vinyl.querySelector("h4")?.textContent || "";
        const price = vinyl.querySelector("p")?.textContent || "";

        modalImg.src = img;
        modalTitle.textContent = title;
        modalArtist.textContent = artist;
        modalPrice.textContent = price;

        selectedVinyl = { img, title, artist, price };

        modal.style.display = "block";
    });
});

closeModalBtn?.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (event) => {
    if (event.target === modal) modal.style.display = "none";
});

window.addToCart = () => {
    if (selectedVinyl) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(selectedVinyl);
        localStorage.setItem("cart", JSON.stringify(cart));
        modal.style.display = "none";
    }
};

/*----------------------------------------------------------------------Display Cart Items-------------------------------------------------------------------------*/
const cartItemsDiv = document.getElementById("cartItems");

if (cartItemsDiv) {
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const renderCart = () => {
    if (cart.length === 0) {
    cartItemsDiv.innerHTML = `
        <h2>Your cart is empty.</h2>
        <p><span class="textColor">
        Please head to the "Shop" page to add some items
        </span></p>
        `;
        return;
    }

    let total = 0;

    cartItemsDiv.innerHTML = cart.map((item, index) => {
    const priceNum = parseFloat(item.price.replace(/[^0-9.-]+/g, "")) || 0;
    total += priceNum;

    return `
        <section class="vinyl" style="margin:10px;">
        <center>
        <img src="${item.img}" class="round"
            style="width:200px;height:200px;">
        <h3>${item.title}</h3>
        <h4>${item.artist}</h4>
        <p>${item.price}</p>
        <button class="remove-btn" data-index="${index}">
            Remove
        </button>
        </center>
        </section>
        `;
    }).join("");

    // Total
    cartItemsDiv.innerHTML += `
    <div style="width:100%; text-align:center; margin-top:20px;">
        <h3>Total: €${total.toFixed(2)}</h3>
    </div>
    `;

    // Remove buttons
    document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const index = btn.dataset.index;
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    });
    });
};
renderCart();
}

/*----------------------------------------------------------------------Contact Page-------------------------------------------------------------------------*/
const form = document.getElementById("myForm");
const customAlert = document.getElementById("customAlert");
const alertMessage = document.getElementById("alertMessage");

window.closeAlert = () => {
    customAlert.style.display = "none";
}

form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const fname = form.fname.value;
    const lname = form.lname.value;
    const email = form.email.value;
    const number = form.number.value;
    alertMessage.textContent = `Thanks ${fname} ${lname}, your message has been sent!\nYou will recieve your response via \nSMS to:${number}\n and Email to:${number}`;
    customAlert.style.display = "block";
    form.reset();
});

/*----------------------------------------------------------------------Top Charts-------------------------------------------------------------------------*/
const charts = {
    "1950s": [
        "Harry Belafonte - Calypso - No sales Estimate",
        "Original Broadway Cast - My Fair Lady - No sales Estimate",
        "Henry Mancini - Music from Peter Gunn - No sales Estimate",
        "Elvis Presley - Elvis' Golden Records - No sales Estimate",
        "Buddy Holly & The Crickets - The ’Chirping’ Crickets - No sales Estimate",
        "Little Richard - Here's Little Richard - No sales Estimate",
        "Chuck Berry - Chuck Berry Is on Top - No sales Estimate",
        "Bill Haley & His Comets - Rock Around the Clock - No sales Estimate",
        "Patti Page - The Tennessee Waltz - No sales Estimate",
        "Ray Charles - The Genius of Ray Charles - No sales Estimate"
    ],
    "1960s": [
        "The Beatles - Abbey Road - 30000000",
        "The Beatles - Sgt. Pepper’s Lonely Hearts Club Band - 28000000",
        "Iron Butterfly - In‑A‑Gadda‑Da‑Vida - 30000000",
        "The Who - Tommy - 20000000",
        "The Doors - The Doors - 20000000",
        "Led Zeppelin - Led Zeppelin II - 33000000",
        "The Beatles - Help! - 33000000",
        "Simon & Garfunkel - Bookends - 26000000",
        "The Beatles - A Hard Day’s Night - 25000000",
        "Led Zeppelin - Led Zeppelin I - 23000000"
    ],
    "1970s": [
        "Pink Floyd - The Dark Side of the Moon - 23700000",
        "Meat Loaf - Bat Out of Hell - 25300000",
        "AC/DC - Back in Black - 24500000",
        "The Eagles - Their Greatest Hits (1971–1975) - 21600000",
        "Fleetwood Mac - Rumours - 20200000",
        "Bee Gees - Saturday Night Fever OST - 19000000",
        "Led Zeppelin - IV - 19500000",
        "Queen - News of the World - No sales Estimate",
        "David Bowie - Ziggy Stardust - No sales Estimate",
        "Bruce Springsteen - Born to Run - No sales Estimate"
    ],
    "1980s": [
        "Michael Jackson - Thriller - 27000000",
        "AC/DC - Back in Black - 24500000",
        "Prince & The Revolution - Purple Rain - No sales Estimate",
        "U2 - The Joshua Tree - No sales Estimate",
        "Madonna - Like a Virgin - No sales Estimate",
        "Guns N’ Roses - Appetite for Destruction - No sales Estimate",
        "Whitney Houston - Whitney - No sales Estimate",
        "Cyndi Lauper - She’s So Unusual - No sales Estimate",
        "Bruce Springsteen - Born in the U.S.A. - No sales Estimate",
        "Metallica - ...And Justice for All - No sales Estimate"
    ],
    "1990s": [
        "Alanis Morissette - Jagged Little Pill - No vinyl-specific estimate",
        "Backstreet Boys - Backstreet Boys - No vinyl-specific estimate",
        "Nirvana - Nevermind - No vinyl-specific estimate",
        "Backstreet Boys - Millennium - No vinyl-specific estimate",
        "...Baby One More Time - Britney Spears - No vinyl-specific estimate",
        "Metallica - Metallica (The Black Album) - No vinyl-specific estimate",
        "Shania Twain - Come On Over - No vinyl-specific estimate",
        "Mariah Carey - Music Box - No vinyl-specific estimate",
        "Mariah Carey - Daydream - No vinyl-specific estimate",
        "Whitney Houston - The Bodyguard OST - No vinyl-specific estimate"
    ],
    "2000s": [
        "Lady Gaga - The Fame / The Fame Monster - No vinyl-specific estimate",
        "Linkin Park - Hybrid Theory - No vinyl-specific estimate",
        "Eminem - The Marshall Mathers LP - No vinyl-specific estimate",
        "Eminem - The Eminem Show - No vinyl-specific estimate",
        "Norah Jones - Come Away With Me - No vinyl-specific estimate",
        "Britney Spears - Oops!... I Did It Again - No vinyl-specific estimate",
        "Green Day - American Idiot - No vinyl-specific estimate",
        "U2 - All That You Can’t Leave Behind - No vinyl-specific estimate",
        "Usher - Confessions - No vinyl-specific estimate",
        "Amy Winehouse - Back to Black - No vinyl-specific estimate"
    ],
    "2010s": [
        "The Beatles - Abbey Road - 558000",
        "Pink Floyd - The Dark Side of the Moon - 376000",
        "Various Artists - Guardians of the Galaxy OST - 367000",
        "Bob Marley & The Wailers - Legend - 364000",
        "Amy Winehouse - Back to Black - 351000",
        "Michael Jackson - Thriller - 334000",
        "The Beatles - Sgt. Pepper’s Lonely Hearts Club Band - 313000",
        "Fleetwood Mac - Rumours - 304000",
        "Miles Davis - Kind of Blue - 286000",
        "Lana Del Rey - Born to Die - 283000"
    ],
    "2020s": [
        "Taylor Swift - 1989 (Taylor’s Version) - 1014000",
        "Taylor Swift - Midnights - 945000",
        "Adele - 30 - 318000",
        "Harry Styles - Fine Line - 232000",
        "The Beatles - Abbey Road - 246000",
        "Billie Eilish - When We All Fall Asleep, Where Do We Go? - 176000",
        "Queen - Greatest Hits I - 139000",
        "Soundtrack - Guardians of the Galaxy OST - 123000",
        "Beach Boys - Sounds Of Summer - 107000",
        "Pink Floyd - Dark Side Of The Moon - 92000"
    ]
};

const decadeSelect = document.getElementById("decadeSelect");
const results = document.getElementById("results");

decadeSelect?.addEventListener("change", () => {
    const decade = decadeSelect.value;
    if (charts[decade]) {
        results.textContent = charts[decade].map((album, i) => `${i + 1}. ${album}`).join("\n");
    } else {
        results.textContent = "";
    }
});
});