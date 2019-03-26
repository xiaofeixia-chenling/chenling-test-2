const expect = chai.expect;
import Vue from 'vue'
import Button from '../src/button.vue'

Vue.config.productionTip = false;
Vue.config.devtools = false;

describe('Button', () => {
    //BDD 行为测试驱动

  it('存在.', () => {
    expect(Button).to.be.ok
  })
  it('可以设置icon.', () => {
    const Constructor = Vue.extend(Button)
    const vm = new Constructor({
        propsData: {
            iconName: 'settings'
        }
    }).$mount()
    const useElements = vm.$el.querySelectorAll('use')
    expect(useElements[0].getAttribute('xlink:href')).to.equal('#icon-i-settings')
    vm.$destroy()
  })

  it('可以设置loading.', () => {
      const Constructor = Vue.extend(Button)
      const vm = new Constructor({
          propsData: {
            iconName: 'settings',
            loading: true
          }
    }).$mount()
    const useElements = vm.$el.querySelectorAll('use')
    expect(useElements.length).to.equal(1)
    expect(useElements[0].getAttribute('xlink:href')).to.equal('#icon-i-loading')
    vm.$destroy()
  })

  it('ico 默认的order 是 1', () => {
      const div = document.createElement('div')
      document.body.appendChild(div)
      const Constructor = Vue.extend(Button)
      const vm = new Constructor({
          propsData: {
              iconName: 'settings'
          }
      }).$mount(div)
      const icon = vm.$el.querySelector('svg')
      expect(getComputedStyle(icon).order).to.eq('1')
      vm.$destroy()
  })

  it('设置 iconPosition 可以变化 order', () => {
      const div = document.createElement('div')
      document.body.appendChild(div)
     const Constructor = Vue.extend(Button)
      const vm = new Constructor({
          propsData: {
              iconName: 'settings',
              iconPosition: 'right'
          }
      }).$mount(div)
      const icon = vm.$el.querySelector('svg')
      expect(getComputedStyle(icon).order).to.eq('2')
      vm.$el.remove()
      vm.$destroy()
  })

  it('点击button 触发 click 事件', () => {
      const Constructor = Vue.extend(Button)
      const vm = new Constructor({
          propsData: {
              iconName: 'settings'
          }
      }).$mount()
      const callback = sinon.fake();
      vm.$on('click', callback)
      vm.$el.click()
      expect(callback).to.have.been.called
  })

})
