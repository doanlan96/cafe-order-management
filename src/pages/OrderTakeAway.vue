<template>
<div style="display:flex">
       <!-- section de chia man hinh ra 2 phan left & right -->
       <section class="left">
           <!--        search bar        -->
            <div class="search">
                <div class="s-title">
                    <h3>Menu</h3>
                </div>
                <div class="s-title">
                    <div class="searchContainer">
                        <div class="fa fa-search searchIcon"></div>
                        <input id="searchbox" class="searchbar" type="text">
                    </div>
                </div>
            </div>
            <!--        danh muc san pham    -->
            <div class="menuContainer">
                <form class="form">
                    <!-- Cac nut sort -->
                    <div class="btnMenu">
                        <button class="form__button">Tất cả</button>
                        <button class="form__button">Trà</button>
                        <button class="form__button">Đồ uống nóng</button>
                        <button class="form__button">Nước hoa quả</button>
                        <button class="form__button">Cafe</button>
                        <button class="form__button">Trà sữa</button>
                        <button class="form__button">Đồ ăn vặt</button>
                    </div>
                    <!-- section liet ke product -->
                    <div class="menu">
                        <!-- product 1 -->
                        <div class="table">
                            <div class="tableContainer">
                                <div class="image">
                                    <img alt="Tra chanh">
                                </div>
                                <div class="p-detail">
                                    <h3 id="p-name">Tra chanh</h3>
                                    <h3 id="p-price">15.000d</h3>
                                </div>
                            </div>
                        </div>
                        <!-- product 2 -->
                        <div class="table">
                            <div class="tableContainer">
                                <div class="image">
                                    <img alt="Tra chanh">
                                </div>
                                <div class="p-detail">
                                    <h3 id="p-name">Tra chanh</h3>
                                    <h3 id="p-price">15.000d</h3>
                                </div>
                            </div>
                        </div>
                        <div class="table">
                            <div class="tableContainer">
                                <div class="image">
                                    <img alt="Tra chanh">
                                </div>
                                <div class="p-detail">
                                    <h3 id="p-name">Tra chanh</h3>
                                    <h3 id="p-price">15.000d</h3>
                                </div>
                            </div>
                        </div>
                        <div class="table">
                            <div class="tableContainer">
                                <div class="image">
                                    <img alt="Tra chanh">
                                </div>
                                <div class="p-detail">
                                    <h3 id="p-name">Tra chanh</h3>
                                    <h3 id="p-price">15.000d</h3>
                                </div>
                            </div>
                        </div>
                        <div class="table">
                            <div class="tableContainer">
                                <div class="image">
                                    <img alt="Tra chanh">
                                </div>
                                <div class="p-detail">
                                    <h3 id="p-name">Tra chanh</h3>
                                    <h3 id="p-price">15.000d</h3>
                                </div>
                            </div>
                        </div>
                        <div class="table">
                            <div class="tableContainer">
                                <div class="image">
                                    <img alt="Tra chanh">
                                </div>
                                <div class="p-detail">
                                    <h3 id="p-name">Tra chanh</h3>
                                    <h3 id="p-price">15.000d</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
        <!-- section ben phai   -->
        <section class="right">
            <div class = "tMenu">
                <!-- The ten cua table -->
                <div class = "tableTag">
                    <div class="fa-solid fa-xmark btndelete"></div>
                    <h4>Sân_Bàn 1</h4>
                </div>
                <!-- add icon -->
                <div class="add">
                    <div class="fa-solid fa-plus"></div>
                </div>
                <!-- order -->
                <div class="order">
                    <div class="table">
                        <!--        order 1      -->
                        <div class="row">
                            <div class="fa-solid fa-trash-can deleteIcon"></div>
                            <div class="td">Tra Chanh</div>
                            <div class="td">
                                <div class="quantity">
                                    <input type="checkbox" id="check" class="checkbox">
                                    <input type="number" class="number">
                                </div>
                            </div>
                            <div class="td">
                                <div class="quantity">
                                    <input type="checkbox" class="checkbox">
                                    <input type="number" class="number">
                                </div>
                            </div>
                        </div>
                        <!--        order 2      -->
                        <div class="row">
                            <div class="fa-solid fa-trash-can deleteIcon"></div>
                            <div class="td">Tra Chanh</div>
                            <div class="td">
                                <div class="quantity">
                                    <input type="checkbox" class="checkbox">
                                    <input type="number" class="number">
                                </div>
                            </div>
                            <div class="td">
                                <div class="quantity">
                                    <input type="checkbox" class="checkbox">
                                    <input type="number" class="number">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="fa-solid fa-trash-can deleteIcon"></div>
                            <div class="td">Tra Chanh</div>
                            <div class="td">
                                <div class="quantity">
                                    <input type="checkbox" class="checkbox">
                                    <input type="number" class="number">
                                </div>
                            </div>
                            <div class="td">
                                <div class="quantity">
                                    <input type="checkbox" class="checkbox">
                                    <input type="number" class="number">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="fa-solid fa-trash-can deleteIcon"></div>
                            <div class="td">Tra Chanh</div>
                            <div class="td">
                                <div class="quantity">
                                    <input type="checkbox" class="checkbox">
                                    <input type="number" class="number">
                                </div>
                            </div>
                            <div class="td">
                                <div class="quantity">
                                    <input type="checkbox" class="checkbox">
                                    <input type="number" class="number">
                                </div>
                            </div>
                        </div>
                        <!-- phan thanh toan -->
                        <div class="footer">
                            <div class="sum">
                                <h4>Tong tien</h4>
                                <input id="tong" type="text" class="m-sum">
                                <h5 class="money">200.000</h5>
                            </div>
                            <div class="payment">
                                <button class="bill"><i class="fa-solid fa-receipt billIcon"></i>In hoa don</button>
                                <button class="pay">Thanh toan</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
</div>        
</template>

<script>
export default {
    name: "OrderTakeAwway",
    // setup() {
        
    // },
}
</script>

<style scoped>
/* section search */
.search {
    background-color: white;
    border: 1px solid black;
    display: flex;    
    flex-wrap: wrap;
    justify-content: space-around;

}

body {
    background-color: #e9e6e6;
    margin-right: 0;
}

/*  Text "Menu"     */
 .s-title{
    display: flex;
    align-items: center;
    padding: 0 1rem;
 } 
/*      search bar area     */
 .searchContainer {
    display: flex;
    flex: 1 1 300px;
    position: relative;
    border: 1px solid #c9c4c4;
    border-radius: 10px;
    overflow: hidden;
    width: 400px;
  }

  .searchContainer:hover {
      border-color: #000000;
  }

  /* edit search icon */
  .searchIcon {
    padding: 0.5rem;
  }

/*      search bar      */
  #searchbox {
    width: 100%;
    border: none;
    border-radius: 0px 10px 10px 0px;
    outline: none;
    font-size: 16px;
  }
  
  input[type="number"] {
      background: transparent;
      border-top: none;
      border-right: none;
      border-left: none;
      outline: none;
      font-size: 16px;
      text-align: right;
  }
/* Hide number arrow */
  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }

/*    layout chung cua 2 man hinh   */
  .container {
      height: 100vh;
      display: flex;
  }
/*      edit 2 man hinh      */
  section {
      height: 100%;
      display: flex;
      flex: 1;
      flex-direction: column;
  }

  section .right{
      margin: 0;
  }

  .menuContainer {
      /* display: block; */
  }

  form {
      /* display: inline-table; */
  }
       /*      sector cua button      */
  .btnMenu {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 1rem;
  }
        /*      Cac nut sort     */
  .form__button {
      padding: 0.2rem 1rem;
      margin: 10px;
      background-color: white;
      border: 1px solid #8d8d8d94;
      border-radius: 4px;
      cursor: pointer;
  }
        /*      layout display product     */
  .menu {
    display: grid;
    grid-gap: 20px;
    margin: auto;
    grid-template-columns: auto auto auto auto;
  }
   
  .table {
      padding: 1rem;
  }
        /*   product specs    */
  .tableContainer {
      /* border: 1px solid black;
      background-color: #f1f1f1; */
      display: table-cell; 
      width: 150px;
      text-align: center;
      cursor: pointer;
      margin: 1.5em;
  }

  .tableContainer:hover {
      border: 1px groove red;
      background-color: white; 
  }

  .image {
      /* padding-top: 1rem; */
  }
        /*   size img truyen vao    */
  img {
      width: 100%;
      height: 100%;
  }
        /*     product name      */
  #p-name {
      margin: 0;
      text-align: left;
      font-size: medium;
      font-family: Futara, sans-serif;
  }
        /*     product price      */
  #p-price {
      margin: 0;
      text-align: left;
      font-size: medium;
      font-family: Futara, sans-serif;
      color: #00c000;
  }
        /*        layout section ben phai       */
  .tMenu {
    margin-left: 1rem;
    border: 0.5px solid #b0a9a9bf;
    background-color: white;
    height: 100%;
    /* display: inline-flex;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: flex-start; */
  }
        /*        layout the ten cua table      */
  .tableTag {
      border-bottom: 1px groove white;
      border-right: 1px groove white;
      display: inline-flex;
      flex-direction: row-reverse;
      align-items: center;
      height: 5%;
      box-shadow: 3px 2px #cdcdcd;
  }

          /*        icon delete - x     */
  .btndelete {
      padding: 0.5rem 0.2rem 0.5rem 1rem;
      font-size: small;
  }

        /*        icon them tag "+"     */
  .add {
    display: inline-flex;
    font-size: small;
    padding-left: 0.3rem;
}
        /*        layout muc order      */
  .order {
    display: flex;
    padding-top: 1rem;
    width: 100%;
    flex-direction: column;
  }

  .table {
      display: table;
  }
        /*        layout each order       */
  .table .row{
      display: grid;
      grid-gap: 20px;
      margin: auto;
      grid-template-columns: auto auto auto auto;
      border: 0.5px solid #cbcbcb;
      align-items: center;
  }
        /*        layout data trong order       */
  .table .td{
      display: table-cell;
      padding: 0.5rem;
  }
        /*        edit product name in order      */
  .td:nth-child(2) {
      padding-left: 1.5rem;
      font-size: 18px;
  }
        /*        edit checkbox      */
  .checkbox {
    transform: scale(1.2);
    cursor: pointer;
  }
        /*        input so luong + price     */
  .quantity {
    display: flex;
    justify-content: flex-end;
  }
        /*        edit length cua input box      */
  .number {
      width: 25%;
  }
        /*        icon delete -  trashbin      */
  .deleteIcon {
    display: table-cell;
    padding: 0.6rem;
    color: red;
    cursor: pointer;
  }
        /*        section thanh toan      */
  .footer {
      display: flex;
      bottom: 0;
      right: 0;
      position: absolute;
      width: 40%;
      height: 30%;
      flex-direction: column;
      align-items: flex-end;
      margin-bottom: 3rem;
      border-top: 5px solid black;
  }

  .footer::after {
      content: '';
      display: block;
      position: absolute;
      width: 100px;
      top: -5px;
      border: 5px solid white;
  }
        /*        layout cua "Tong tien"     */
  .sum {
      display: inline-flex;
      align-items: center;
      padding: 0 2rem 5rem 2rem;
      width: 60%;
      height: 30%;
      flex-direction: row;
      flex-wrap: nowrap;
  }
        /*        layout 2 button thanh toan - bill      */
  .payment {
      display: inline;
      margin-bottom: 1rem;
      width: 80%;
  }
        /*        edit input box tong tien     */
  .m-sum {
      width: 18px;
      height: 18px;
      font-size: 14px;
      margin: 2rem 2rem 2rem 0.5rem;
  }
        /*        layout button chung cua thanh toan - bill     */
  .payment button {
      font-size: large;
      width: 160px;
      margin: 1rem;
      padding: 0.3rem 1rem;
  }
        /*        bill button      */
  .bill {
      background-color: #fc8484;
      cursor: pointer;
  }
        /*      button thanh toan        */
  .pay {
      background-color: #91dee0;
      cursor: pointer;
  }
        /*        icon bill      */
  .billIcon {
      margin-right: 0.5rem;
  }
        /*        edit h3 chung      */
  h3 {
      font-family: Franklin Gothic Medium, sans-serif;
      font-size: 20px;
  }
        /*        edit h4 chung      */
  h4 {
      font-family: Franklin Gothic Medium, sans-serif;
      padding-left: 0.5rem;
      color: #0239ef;
  }
        /*        edit h5 chung      */
  h5 {
      font-size: large;
      padding: 1rem;
  }
        /*        edit text "Tong tien"      */
  .sum h4 {
      font-size: 18px;
      margin: 1rem 0 1rem 1rem;
      padding: 0.5rem;
  }
</style>