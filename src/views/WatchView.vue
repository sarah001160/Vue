<script setup>
import { watch, ref, reactive } from 'vue'

// reactive 定義的 物件 類型數據
const obj = reactive(
  {
    a: {
      b: {
        c: 666,
      },
      b1: {
        d: 0
      }
    }
  });

// ref 定義的 物件 類型數據
const refObj = ref({
  a: {
    b: {
      c: 666
    }
  }
})

// reactive 定義的 物件 類型數據
const person = reactive({
  car: {
    c1: '瑪莎拉蒂',
    c2: '保時捷'
  }
})

function plus() {
  obj.a.b.c += 1;
}

function replace() {
  obj.a.b.c = 888
}

function addD() {
  obj.a.b1.d += 1;
}

function plusRef() {
  refObj.value.a.b.c += 1; // 操作 ref 定義的數據(無論哪個型別)，要多寫.value
}

function replaceRef() {
  refObj.value.a.b.c = 888;
}

function changeCar2() {
  // 更新物件屬性
  person.car.c2 = '大眾'
}

function changeCar() {
  // 替換掉整個物件 (新的址)
  person.car = { c1: '奧迪', c2: '艾瑪' }
}

function originCar() {
  // 替換掉整個物件 (新的址)
  person.car.c2 = '保時捷'
}


// 1. watch 監聽 reactive 定義的 物件 類型 ，watch 默認是 deep 深層監聽，该回调函数在所有嵌套的变更时都会被触发：
watch(obj, (newVal, oldVal) => {
  console.log('obj變化了~', newVal, oldVal)
  // 因為指向同樣的址 , newVal 和 oldVal 值會一樣
})

// 2.同例1，這次只想 watch obj.a.b.c ，必須使用 getter 回傳函數回傳obj.a.b.c，才能監聽到物件內的屬性
// watch 只會監聽obj.a.b.c並回傳，若obj.a.b.c沒有異動就不會回傳 (例如:obj.b1.d更新了，不會觸發obj.a.b.c的監聽)
watch(() => obj.a.b.c, (newVal, oldVal) => {
  console.log('obj.a.b.c 變化了~', newVal, oldVal)
})

// 3. watch監聽 ref 定義的 物件 類型數據，這個watch不會被觸發...
watch(refObj, (newVal, oldVal) => {
  console.log('3. refObj 變化了~', newVal, oldVal) // 這個 watch 沒被觸發
})

// 4. watch 監聽 ref 定義的物件類型數據，要多寫{deep: true} 才能觸發深度監聽，看見 ref 定義之物件類型內屬性的變化
watch(refObj, (newVal, oldVal) => {
  console.log('4. refObj 變化了{deep:true}~', newVal, oldVal) // 這個 watch 沒被觸發
}, { deep: true })


// 5. 不使用getter函數的話 
// reactive定義的物件的屬性，操作屬性變動 [person.car.c2 = '大眾'】，會觸發這個監聽
// 但換掉 整個person.car物件，並不會觸發這個監聽
// newVal 和 oldVal值一樣
// 意思是監聽有細微的變動person.car.c2，但不監聽整個物件person.car
watch(person.car, (newVal, oldVal) => {
  console.log('5.person.car變化', newVal, oldVal)
})

//6. 改用getter寫法回傳值 ()=>person.car
// 換掉整個 person.car={新物件}，會觸發這個監聽，且就不監聽person.car.c2的變動，(觸發6以後，5的watch不被觸發了)
// 因為你的person.car已經是新物件新的址了
watch(() => person.car, (newVal, oldVal) => {
  console.log('6. ()=> person.car變化', newVal, oldVal) // newVal {c1: '奧迪', c2: '艾瑪'}、oldVal{c1: '瑪莎拉蒂', c2: '保時捷'} 
})

//https://www.youtube.com/watch?v=GGls6ajsr2w&list=PLmOn9nNkQxJEnGM4Jf0liBcyedAtuQq-O&index=20
//16:25繼續
</script>

<template>
  <main>
    <div>
      <h1>watch原理，請看 console.log</h1>
      <div class="box">
        <p>reactive 定義的 物件 類型數據</p>
        <h2>obj.a.b.c 的號碼 : {{ obj.a.b.c }}</h2>
        <h2>obj.a.b1.d 的號碼 : {{ obj.a.b1.d }}</h2>
        <button @click="plus">obj.a.b.c +1 </button>
        <button @click="replace">obj.a.b.c 直接取代為 888 </button>
        <button @click="addD">obj.a.b1.d +1 </button>
        查看監聽watch
      </div>

      <div>
        <p>ref 定義的 物件 類型數據</p>
        <h2>reObj.a.b.c的號碼 {{ refObj.a.b.c }}</h2>
        <button @click="plusRef">obj.a.b.c +1 </button>
        <button @click="replaceRef">obj.a.b.c 直接取代為 888 </button>
      </div>
    </div>

    <div class="box">
      <p></p>
      <h2>車 {{ person.car }}</h2>
      <button @click="changeCar">換車 </button>
      <button @click="changeCar2">換車二 </button>
      <button @click="originCar">會回原本的車二</button>
    </div>
  </main>
</template>

<style scoped lang="sass">
main
  padding: 1rem
  h1
    margin-bottom: 1rem
  div
    margin-bottom: 2rem
  .box
    background: #F1E1FF
    width: 100%
    padding: 1rem
  button
    margin: 10px
    padding: 5px
</style>
