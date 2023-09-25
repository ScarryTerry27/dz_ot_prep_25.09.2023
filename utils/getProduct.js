import bugCount from "../main.js"

export function renderProduct(obj, count) {
    let app = document.getElementById('app')
    let productResult = document.getElementById('productResult')
    let productBox = document.createElement('div')
    let infoBox = document.createElement('div')
    let foto = document.createElement('img')
    let title = document.createElement('h2')
    let desc = document.createElement('p')
    let rating = document.createElement('div')
    let rate = document.createElement('span')
    let price = document.createElement('span')
    let btnAdd = document.createElement('button');
    let quantity = document.createElement('span')

    quantity.classList.add('quantity')
    productBox.classList.add('productBox')
    foto.classList.add('foto')
    title.classList.add('title')
    desc.classList.add('desc')
    rating.classList.add('rating')
    rate.classList.add('rate')
    price.classList.add('price')
    btnAdd.classList.add('btnAdd')
    productBox.id = obj.id

    foto.src = obj.image
    desc.textContent = obj.description
    title.textContent = obj.title
    rate.textContent = obj.rating?.rate
    price.textContent = obj.price
    btnAdd.textContent = 'Добавить в корзину'
    if(count) {
        quantity.textContent = `X ${count}`
        productBox.append(quantity)
    }


    rating.append(rate, price)
    infoBox.append(foto, title, desc)
    productBox.append(infoBox, rating, btnAdd)
    if(productResult) {
        productResult.append(productBox)
    } else {
        app.append(productBox)
        btnAdd.remove()
    }

   
}

let store = {}
    
function setBug() {
    let btnsAdd = document.querySelectorAll('.btnAdd')
    btnsAdd.forEach((btn) => {
        btn.addEventListener('click', async function() {
            let cardID = btn.parentNode.id
            // console.log(cardID)
            let response = await fetch(`https://fakestoreapi.com/products/${cardID}`)
            let result = await response.json()
            if(!store[cardID]) {
                store[cardID] = {
                    quantity: 1,
                    product: result
                }
            }  else {
                store[cardID].quantity += 1
            }
            
            localStorage.setItem('bug', JSON.stringify(store))
            bugLength()
            // console.log(store)
        })
    })
    
}

export function bugLength() {
    let bugFromStorage = localStorage.getItem('bug')
    let tranformBug = JSON.parse(bugFromStorage)
    if (!bugFromStorage) {
        bugCount.textContent = 0
    } else {

        bugCount.textContent = Object.keys(tranformBug).length
    }
}




export async function getProduct(src) {
    if(src != '') {
        try {
            let result = await fetch(src)
            let data = await result.json()
            data.map((item) => {
                renderProduct(item)
            })
            setBug()

        }
        catch (e) {
            console.log(e)
        }
    } else {
        try {
            let result = await fetch('https://fakestoreapi.com/products')
            let data = await result.json()
            data.map((item) => {
                renderProduct(item) 
            })
            setBug()
        } 
        catch (e) {
            console.log(e)
        }
    }
}





 