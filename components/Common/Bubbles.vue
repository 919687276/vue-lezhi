<template>
  <div class="location">
    <div v-for="bub in bubs" :class="['bub','bub-'+bub.id, bub.id%3===0?'left':'']" :key="bub.id"
      :style="{'background-color': bub.color,height: bub.r+'px', width: bub.r+'px', 'animation-duration': bub.anim_dur+'s', left: bub.left+'%'}"
      @click="remove_bub(bub.id)"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      timer: null,
      bub_index: 0,
      bubs: [],
      color_array: ['#21CD92', '#e91e63', '#9c27b0', '#2196f3', '#00bcd4', '#4caf50', '#009688', '#ffc107', '#ff5722', '#607d8b', '#795548', '#f44336', '#936'],
    };
  },
  created() {
    this.timer = setInterval(() => {
      this.create_bub();
    }, 500);
  },
  methods: {
    random_int(min, max) {
      const newmin = min || 0;
      const newmax = max || 2;
      return Math.floor((Math.random() * (newmax - newmin)) + newmin);
    },
    create_bub() {
      const time = this.random_int(10, 21);
      this.bub_index += 1;
      let index = this.bub_index;

      this.bubs.push({
        id: index,
        r: this.random_int(20, 155),
        color: this.color_array[this.random_int(0, this.color_array.length)],
        left: this.random_int(10, 91),
        anim_dur: time,
      });
      // setTimeout(this.remove_bub(this.bub_index), time * 1000);
      setTimeout(() => {
        for (let i = 0; i < this.bubs.length; i += 1) {
          if (index === this.bubs[i].id) {
            index = i;
          }
        }
        if (index) { this.bubs.splice(index, 1); }
      }, time * 1000);
    },
    remove_bub(id) {
      let index;
      for (let i = 0; i < this.bubs.length; i += 1) { if (id === this.bubs[i].id) { index = i; } }
      if (index) { this.bubs.splice(index, 1); }
    },
  },
};
</script>

<style scoped>
.location{
  overflow: hidden;
  position: absolute;
  width: 100%;
  height: 100%;
}
.bub {
  position: absolute;
  top: calc(100% + 150px);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  border-radius: 100%;
  opacity: 0.15;
  -webkit-animation: floatR ease none;
  animation: floatR ease none;
}
.bub.left {
  -webkit-animation: floatL ease none;
  animation: floatL ease none;
}
@-webkit-keyframes floatR {
  to {
    top: -150px;
    -webkit-transform: translate(150%, -50%);
    transform: translate(150%, -50%);
  }
}
@keyframes floatR {
  to {
    top: -150px;
    -webkit-transform: translate(150%, -50%);
    transform: translate(150%, -50%);
  }
}
@-webkit-keyframes floatL {
  to {
    top: -150px;
    -webkit-transform: translate(-250%, -50%);
    transform: translate(-250%, -50%);
  }
}
@keyframes floatL {
  to {
    top: -150px;
    -webkit-transform: translate(-250%, -50%);
    transform: translate(-250%, -50%);
  }
}
</style>
