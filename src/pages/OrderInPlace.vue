<template>
   <!--     section search bar     -->
    <div class = "search">
        <div class = "s-title">
            <h3>Bàn</h3>
        </div>
        <div class = "s-title">
               <!--     search bar     -->
            <div class="searchContainer">
                <div class="fa fa-search searchIcon"></div>
                <input type="text">
            </div>
        </div>
    </div>
   <!--     section chon ban`     -->
    <div class = "container">
           <!--     text bar     -->
        <div class="place">
            <h3 class="location">Ngoài sân</h3>
        </div>

           <!--     layout      -->
        <div class="tb">
               <!--     table 1    -->
            <div class="table">
                   <!--     content trong 1 table     -->
                <div class="tableContainer">
                    <div class="icon">
                        <i class="fa-solid fa-store storeIcon fa-4x"></i>
                    </div>
                    <!--     table number    -->
                    <div class="tableNum">
                        <h3>Bàn 1</h3>
                    </div>
                </div>
            </div>
             <!--     table 2     -->
            <div class="table">
                <div class="tableContainer">
                    <div class="icon">
                        <i class="fa-solid fa-store storeIcon fa-4x"></i>
                    </div>
                    <div class="tableNum">
                        <h3>Bàn 2</h3>
                    </div>
                </div>
            </div>

            <div class="table">
                <div class="tableContainer">
                    <div class="icon">
                        <i class="fa-solid fa-store storeIcon fa-4x"></i>
                    </div>
                    <div class="tableNum">
                        <h3>Bàn 3</h3>
                    </div>
                </div>
            </div>

            <div class="table">
                <div class="tableContainer">
                    <div class="icon">
                        <i class="fa-solid fa-store storeIcon fa-4x"></i>
                    </div>
                    <div class="tableNum">
                        <h3>Bàn 4</h3>
                    </div>
                </div>
            </div>

            <div class="table">
                <div class="tableContainer">
                    <div class="icon">
                        <i class="fa-solid fa-store storeIcon fa-4x"></i>
                    </div>
                    <div class="tableNum">
                        <h3>Bàn 5</h3>
                    </div>
                </div>
            </div>
            
            <div class="table">
                <div class="tableContainer">
                    <div class="icon">
                        <i class="fa-solid fa-store storeIcon fa-4x"></i>
                    </div>
                    <div class="tableNum">
                        <h3>Bàn 6</h3>
                    </div>
                </div>
            </div>

            <div class="table">
                <div class="tableContainer">
                    <div class="icon">
                        <i class="fa-solid fa-store storeIcon fa-4x"></i>
                    </div>
                    <div class="tableNum">
                        <h3>Bàn 7</h3>
                    </div>
                </div>
            </div>

            <div class="table">
                <div class="tableContainer">
                    <div class="icon">
                        <i class="fa-solid fa-store storeIcon fa-4x"></i>
                    </div>
                    <div class="tableNum">
                        <h3>Bàn 8</h3>
                    </div>
                </div>
            </div>
        </div>

        <div class="place">
            <h3 class="location2">Trong nhà</h3>
        </div>
        <div class="tb">
            <div class="table">
                <div class="tableContainer">
                    <div class="icon">
                        <i class="fa-solid fa-store storeIcon fa-4x"></i>
                    </div>
                    <div class="tableNum">
                        <h3>Bàn 1</h3>
                    </div>
                </div>
            </div>

            <div class="table">
                <div class="tableContainer">
                    <div class="icon">
                        <i class="fa-solid fa-store storeIcon fa-4x"></i>
                    </div>
                    <div class="tableNum">
                        <h3>Bàn 2</h3>
                    </div>
                </div>
            </div>

            <div class="table">
                <div class="tableContainer">
                    <div class="icon">
                        <i class="fa-solid fa-store storeIcon fa-4x"></i>
                    </div>
                    <div class="tableNum">
                        <h3>Bàn 3</h3>
                    </div>
                </div>
            </div>

            <div class="table">
                <div class="tableContainer">
                    <div class="icon">
                        <i class="fa-solid fa-store storeIcon fa-4x"></i>
                    </div>
                    <div class="tableNum">
                        <h3>Bàn 4</h3>
                    </div>
                </div>
            </div>
    </div>
    </div>
</template>

<script>
export default {
    name: "OrderInPlace",
}
</script>

<style scoped>
        /*       section search bar       */
.search {
    background-color: white;
    border: 1px solid black;
    display: inline-flex;  
    width: 50%;  
    flex-wrap: wrap;
    justify-content: space-around;

}

body {
    background-color: #e9e6e6;
}
        /*       text       */
 .s-title{
    display: flex;
    align-items: center;
    padding: 0 1rem;
 } 
        /*       search bar container      */
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
        /*       edit text box       */
  input[type="text"] {
    width: 100%;
    border: none;
    border-radius: 0px 10px 10px 0px;
    outline: none;
    font-size: 16px;
  }
        /*      edit search icon       */
  .searchIcon {
    padding: 0.5rem;
  }
          /*       container cua chon ban`      */
  .container {
      display: block;
      width: 50%;
      margin: 0 auto;
  } 

        /*       edit space cua textbar "Ngoai san" - "Trong nha"       */
  .place {
      text-align: center;
      padding: 2rem 0;
 
  }
        /*       edit content bar "Ngoai san" - "Trong nha"      */
  .location {
      padding: 0.8rem 0;
      background-color: #9942e9;
      margin: 0 auto;
      color: white;
  }
        /*       edit content bar "Ngoai san" - "Trong nha"      */  
  .location2 {
      padding: 0.8rem 0;
      background-color: #7b2ff7;
      margin: 0 auto;
      color: white;
  }
        /*       layout chon ban`     */  
  /* .tb {
      display: flex;
      margin: auto;
      flex-wrap: wrap;
      justify-content: space-evenly;
  } */
  .tb {
      display: grid;
      grid-gap: 20px;
      margin: auto;
      grid-template-columns: auto auto auto auto;
  }
        /*       edit khung chua 1 ban`      */  
  .table {
      padding: 1rem;
  }
        /*       edit content 1 ban`      */  
  .tableContainer {
      border: 1px solid black;
      display: table-cell; 
      width: 150px;
      text-align: center;
      background-color: white;
      cursor: pointer;
      margin: 1.5em;
  }

  .tableContainer:hover {
      background-color: #f1f1f1;
  }
        /*       icon cua ban`      */  
  .icon {
      padding-top: 1rem;
  }
        /*       edit h3 chung      */  
  h3 {
      font-family: Franklin Gothic Medium, sans-serif;
      font-size: 20px;
  }


</style>