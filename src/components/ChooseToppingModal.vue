<template>
  <div id="myModal" class="modal">
    <!-- <div class="modal-content"> -->
      <!-- <h1>Chọn Topping</h1> -->

    <div class="toppingContainer">
        <div class="t-title">
            <h1>Chọn Topping</h1>
        </div>
        <div class="t-btn">
            <!-- <button :class="{'form__button' : !clicked, 'form__button1' : clicked}" @click="changeButtonStatus();">Trân châu trắng</button>
            <button :class="{'form__button' : !clicked1, 'form__button1' : clicked1}" @click="changeButtonStatus1()">Thạch nha đam</button>
            <button :class="{'form__button' : !clicked2, 'form__button1' : clicked2}" @click="changeButtonStatus2()">Thạch con cá</button>
            <button :class="{'form__button' : !clicked3, 'form__button1' : clicked3}" @click="changeButtonStatus3()">Hạt chia</button>
            <button :class="{'form__button' : !clicked4, 'form__button1' : clicked4}" @click="changeButtonStatus4()">Ít đường</button>
            <button :class="{'form__button' : !clicked5, 'form__button1' : clicked5}" @click="changeButtonStatus5()">Ít đá</button> -->

            <button class="form__button"  @click="changeButtonStatus(); addToppingToToppings('Trân châu trắng', 5000);" v-show="!clicked">Trân châu trắng</button>
            <button class="form__button1" @click="changeButtonStatus(); removeToppingfromToppings('Trân châu trắng');" v-show="clicked">Trân châu trắng</button>
            <button class="form__button" @click="changeButtonStatus1(); addToppingToToppings('Thạch nha đam', 5000);" v-show="!clicked1">Thạch nha đam</button>
            <button class="form__button1" @click="changeButtonStatus1(); removeToppingfromToppings('Thạch nha đam');" v-show="clicked1">Thạch nha đam</button>
            <button class="form__button" @click="changeButtonStatus2(); addToppingToToppings('Thạch con cá', 5000);" v-show="!clicked2">Thạch con cá</button>
            <button class="form__button1" @click="changeButtonStatus2(); removeToppingfromToppings('Thạch con cá');" v-show="clicked2">Thạch con cá</button>            
            <button class="form__button" @click="changeButtonStatus3(); addToppingToToppings('Hạt chia', 5000);" v-show="!clicked3">Hạt chia</button>
            <button class="form__button1" @click="changeButtonStatus3(); removeToppingfromToppings('Hạt chia');" v-show="clicked3">Hạt chia</button>
            <button class="form__button" @click="changeButtonStatus4(); addToppingToToppings('Ít đường', 0);" v-show="!clicked4">Ít đường</button>
            <button class="form__button1" @click="changeButtonStatus4(); removeToppingfromToppings('Ít đường');" v-show="clicked4">Ít đường</button>
            <button class="form__button" @click="changeButtonStatus5(); addToppingToToppings('Ít đá', 0);" v-show="!clicked5">Ít đá</button>
            <button class="form__button1" @click="changeButtonStatus5(); removeToppingfromToppings('Ít đá');" v-show="clicked5">Ít đá</button>
        </div>

        <div class="btnS">
            <button class="back" @click="close()">Trở về</button>
            <button class="confirm" @click.prevent="close(); addTopping();">Xác nhận</button>
        </div>

    </div>       

  </div>
</template>

<script>
// import { Form, } from "vee-validate";
import {mapActions, mapState} from 'vuex';

export default {
  name: "ChooseToppingModal",
  components:{
    // Form,
  },
  data() {
      return {
          toppings: [],
          clicked: false,
          clicked1: false,
          clicked2: false,
          clicked3: false,
          clicked4: false,
          clicked5: false,
      }
  },
  props: ['order_item'],
  computed: {
      ...mapState("toppings", ["toppings"]),
  },
  methods: {
    ...mapActions("toppings", ["getToppings"]),  
    close: function () {
      this.$emit("close", false)
    },
    addTopping: function () {
        this.$emit("addTopping", this.toppings)
    },
    addToppingToToppings (tname, tprice) {
                let toppin = {
                    name : tname,
                    price: tprice
                };
                this.toppings = [toppin, ...this.toppings];       
    },
    removeToppingfromToppings(tname) {
        const index = this.toppings.findIndex(topping => topping.name === tname);
        this.toppings.splice(index, 1);          
    },    
    changeButtonStatus() {
        if (this.clicked) {
            this.clicked = false;
        } else {
            this.clicked = true;
        }
    },
        changeButtonStatus1() {
        if (this.clicked1) {
            this.clicked1 = false;
        } else {
            this.clicked1 = true;
        }
    },
        changeButtonStatus2() {
        if (this.clicked2) {
            this.clicked2 = false;
        } else {
            this.clicked2 = true;
        }
    },
        changeButtonStatus3() {
        if (this.clicked3) {
            this.clicked3 = false;
        } else {
            this.clicked3 = true;
        }
    },
        changeButtonStatus4() {
        if (this.clicked4) {
            this.clicked4 = false;
        } else {
            this.clicked4 = true;
        }
    },
        changeButtonStatus5() {
        if (this.clicked5) {
            this.clicked5 = false;
        } else {
            this.clicked5 = true;
        }
    }
  }
}
</script>

<style scoped>
.toppingContainer {
      display: flex;
      top: 50%;
      left: 50%;
      position: absolute;
      transform: translate(-50%, -50%);
      flex-direction: column;
      width: 700px;
      height: fit-content;
      background: white;
      align-items: center;
  }

  .t-title {
      display: inline;
  }

  .t-btn {
      display: grid;
      align-items: center;
      justify-content: center;
      grid-template-columns: [first] auto [line2] auto [line3] auto [end];
  }

    .btnS {
      display: grid;
      grid-template-columns: [line1] 150px [line2] 150px [end];
      align-items: center;
      justify-content: center;
      grid-gap: 200px;
  }

      .back {
      padding: 0.5rem 1.5rem;
      margin: 10px;
      background-color: #fc8484;
      border: 1px solid #8d8d8d94;
      border-radius: 5px;
      cursor: pointer;
      font-family: Trebuchet MS, sans-serif;
      font-size: medium;
  }

  .back:hover {
      background-color: #44d574;
  }

  .confirm {
      padding: 0.5rem 1.5rem;
      margin: 10px;
      background-color: #91dee0;
      border: 1px solid #8d8d8d94;
      border-radius: 5px;
      cursor: pointer;
      font-family: Trebuchet MS, sans-serif;
      font-size: medium;
  }

  .confirm:hover {
      background-color: #44d574;
  }

    .form__button {
      padding: 0.5rem 1.5rem;
      margin: 10px;
      background-color: white;
      border: 1px solid #8d8d8d94;
      border-radius: 5px;
      cursor: pointer;
  }

  .form__button:hover {
      background-color: #44d574;
      color: white;
  }

      .form__button1 {
      padding: 0.5rem 1.5rem;
      margin: 10px;
      background-color: #44d574;
      color: white;
      border: 1px solid #8d8d8d94;
      border-radius: 5px;
      cursor: pointer;
  }

  .form__button1:hover {
      background-color: white;
      color: black;
  }


.button {
  display: flex;
  justify-content: space-between;
}
[type=button]:not(:disabled), [type=reset]:not(:disabled), [type=submit]:not(:disabled), button:not(:disabled) {
  border-radius: 10px;
  cursor: pointer;
  height: 40px;
  width: 95%;
}
.modal {
  text-align: center;
  font-size: 20px;
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 40%;
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.bo4 {
  display: flex;
  border: 0.5px solid #aaaaaa;
  border-radius: 5px;
}
.sizefull {
  border: none;
  width: 100%;
  margin: 10px;
}
</style>