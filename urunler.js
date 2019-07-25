var dosyaName="";
var resimyolu = "C:\\Users\\reela\\OneDrive\\Masaüstü\\alisveris\\Resimlerim"; 
var MyDb=openDatabase('TicariDB',1.0,'ALisveris Sitesi',20*1024*1024);
// if(!MyDb){
//     alert("Database Oluşturulamadı");
// }
// else{
//     var version=MyDb.version;
//     MyDb.transaction(function(tx){
//         // tx.executeSql('CREATE TABLE IF NOT EXISTS Urunler (UrunID INTEGER PRIMARY KEY, UrunAdi varchar(50), UrunFiyat varchar(50), ResimYolu varchar(50))')
//         // tx.executeSql('DELETE FROM Urunler WHERE UrunID=4')
//         // tx.executeSql('DROP TABLE Urunler');
//         tx.executeSql('CREATE TABLE IF NOT EXISTS Sepet(SepetID INTEGER PRIMARY KEY, UrunID INTEGER,UrunAdi varchar(50), UrunAdet INTEGER, Tutar INTEGER)',[],function(){
//             console.log("Sepet Tablosu Oluşturuldu");
//         });
//     })
// }
var TicariUrun={
    db:openDatabase('TicariDB',1.0,'ALisveris Sitesi',20*1024*1024),

    Uruninsert:function(tablename,colunm,getdata,value){
        this.db.transaction(function(tx){
            tx.executeSql('INSERT INTO '+tablename+' ('+colunm+') VALUES ('+getdata+')', value);
        });
    }
}

MyDb.transaction(function(tx){
    tx.executeSql('SELECT * FROM Urunler',[],function(tx,data){
        var html='<h2 class="section-header">KRİPTO PARALAR</h2><div class="shop-items">'
        for(var i=0; i<data.rows.length; i++){
           html+='<section><div class="shop-item"><span class="shop-item-title">'+ data.rows[i].UrunAdi +'</span><img class="shop-item-image" src="/Resimlerim/'+data.rows[i].ResimYolu +'"><div class="shop-item-details"><span class="shop-item-price">'+'$'+ data.rows[i].UrunFiyat + '</span><button class="btn btn-primary shop-item-button" type="button">SEPETE EKLE</button></div></div>';
        }
        html+='</section>'
        $('#myTabUrun2').html(html)
    })
})

var YeniUruninput=document.querySelector("#Urunismi");
var YeniUrunFiyatinput=document.querySelector("#UrunFiyati");
var YeniUrunEkleBtn=document.querySelector("#UrunEkle");
eventListener();

function eventListener(){
    YeniUrunEkleBtn.addEventListener("click",UrunEkle)
}

function UrunEkle(e){
    var YeniUrunAdi=YeniUruninput.value;
    var YeniUrunFiyati=YeniUrunFiyatinput.value;
    var ResiYoluadi=dosyaName;
    var array=[YeniUrunAdi,YeniUrunFiyati,ResiYoluadi];
    var value="UrunAdi, UrunFiyat, ResimYolu";
    var getdata="?,?,?";
    TicariUrun.Uruninsert('Urunler',value,getdata,array);
    YeniUruninput.value="";
    YeniUrunFiyatinput.value="";
}

function dosyaOnizle() {
  var resim = document.querySelector('img');
  var dosyaSecici = document.querySelector('input[type=file]').files[0];
  var dosyaOkuyucu = new FileReader();
  this.dosyaName = dosyaSecici.name;
  dosyaOkuyucu.onloadend = function () {
      resim.src = dosyaOkuyucu.result;
  }
  if (dosyaSecici) {
      dosyaOkuyucu.readAsDataURL(dosyaSecici);
  } else {
      resim.src = "";
  }
} 
//----------------------------------

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-danger')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
    alert('Satın Aldığınız için Teşekkür Ederiz')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    var sayi=1;
    addItemToCart(title, price, imageSrc, sayi)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc, sayi) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    var snc=sayi;
    
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
           // alert('Daha Önce Sepete EKlenmiş Ürün')
            return 
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input  id="yeniSepeturun" class="cart-quantity-input" type="number" value="${snc}">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}