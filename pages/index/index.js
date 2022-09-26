// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    cartList: [
      {
        id: 1,
        image: '/images/img1.png',
        name: '芹菜',
        price: 6.68,
        isSelected: false,
        num: 3
      },
      {
        id: 2,
        image: '/images/img2.png',
        name: '素米',
        price: 12.98,
        isSelected: false,
        num: 2
      },
    ],
    isAllChecked: false,
    total: 0
  },
  // checkbox-group 众多选框的监听
  changeEvent(e) {
    // 全选按钮的状态取决于 e.detail.value 这个数组的长度和 cartList 数组的长度是否相等
    // console.log(e.detail.value);
    if (e.detail.value.length == this.data.cartList.length) {
      this.setData({
        isAllChecked: true
      })
    } else {
      this.setData({
        isAllChecked: false
      })
    }
    // 这里 我们需要将 视图中选中的多选框的状态 即 isSelected 的值改为 true;  ?如何找到 多选框被选中的 数据

  },
  // 点击全选按钮 改变 商品列表的选中状态
  changeIsSelected() {

    // 克隆数据
    var newArr = JSON.parse(JSON.stringify(this.data.cartList))

    this.setData({
      isAllChecked: !this.data.isAllChecked,
    })
    if (!this.data.isAllChecked) {
      newArr.forEach(ele => {
        ele.isSelected = false
      })
    } else {
      newArr.forEach(ele => {
        ele.isSelected = true
      })
    }
    // console.log(newArr);
    // 这里修改 data 中的数据 应使用 setdata 方法
    this.setData({
      cartList: newArr
    })
    // 调用 totals 函数
    this.totals()
  },
  // 计算 被选中商品 的价格
  totals() {
    const totals = this.data.cartList.reduce((total, current) => {
      if (current.isSelected) {
        return total + current.num * current.price
      } else {
        return total
      }
    }, 0)
    // console.log(totals);
    // 计算完毕 总价格之后 将结果赋值给 data 中的 total
    this.setData({
      total: totals.toFixed (2)
    })
  },
  // checkbox 被点击后 改变 data 中 isSelected 的值
  changeSel(e) {
    // console.log(e.currentTarget.dataset.index);
    var newArr = JSON.parse(JSON.stringify(this.data.cartList))
    newArr.forEach(ele => {
      if (ele.id === e.currentTarget.dataset.index) {
        ele.isSelected = !ele.isSelected
      }
    })
    this.setData({
      cartList: newArr
    })
    this.totals()
  },
  // 点击 减号
  cutNum(e) {
    var newArr = JSON.parse(JSON.stringify(this.data.cartList))
    if (e.currentTarget.dataset.num == 1) {
      newArr[e.currentTarget.dataset.idx].num = 1
    } else {
      newArr[e.currentTarget.dataset.idx].num -= 1
    }
    this.setData({
      cartList: newArr
    })
    this.totals()
  },
  // 点击 加号
  addNum(e) {
    var newArr = JSON.parse(JSON.stringify(this.data.cartList))
    newArr[e.currentTarget.dataset.idx].num += 1
    this.setData({
      cartList: newArr
    })
    this.totals()
  },
  // 点击删除
  delList(e) {
    var newArr = JSON.parse(JSON.stringify(this.data.cartList))
    newArr.splice(e.currentTarget.dataset.delindex, 1)
    this.setData({
      cartList: newArr
    })
    this.totals()
  },
  onLoad() {
    this.totals()
  },
})
