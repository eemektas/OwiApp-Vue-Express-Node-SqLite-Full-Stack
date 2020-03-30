<template>
  <div id="Reports">
    <v-card dark class="mt-5">
      <v-card-title>
        Weather Reports
        <v-spacer></v-spacer>
        <v-text-field
          class="mr-8"
          v-model="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="items"
        :search="search">
        <template v-slot:body="{ items }" >
          <tbody>
            <tr v-for="item in items" :key="item.name">
              <td>{{ item.id }}</td>
              <td>{{ item.city }}</td>
              <td>{{ item.createdAt }}</td>
              <td>{{ item.updatedAt }}</td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import WeatherService from '@/services/WeatherService'
export default {

  name: 'Reports',

  data () {
    return {
      // items: [
      //   afterResp: {
      //     id: null,
      //     city: null,
      //     createdAt: null,
      //     updatedAt: null
      //   }
      // ]
      error: null,
      headers: [
        {
          text: 'ID',
          align: 'start',
          sortable: true,
          value: 'id'
        },
        { text: 'City', value: 'city' },
        { text: 'CreatedAt', value: 'createdAt' },
        { text: 'UpdatedAt', value: 'updatedAt' }
      ],
      search: null,
      items: [ ]
      // [{
      //   name: 'Frozen Yogurt',
      //   calories: 159,
      //   fat: 6.0,
      //   carbs: 24,
      //   protein: 4.0,
      //   iron: '1%'
      // },
      // {
      //   name: 'Ice cream sandwich',
      //   calories: 237,
      //   fat: 9.0,
      //   carbs: 37,
      //   protein: 4.3,
      //   iron: '1%'
      // },
      // {
      //   name: 'Eclair',
      //   calories: 262,
      //   fat: 16.0,
      //   carbs: 23,
      //   protein: 6.0,
      //   iron: '7%'
      // },
      // {
      //   name: 'Cupcake',
      //   calories: 305,
      //   fat: 3.7,
      //   carbs: 67,
      //   protein: 4.3,
      //   iron: '8%'
      // },
      // {
      //   name: 'Gingerbread',
      //   calories: 356,
      //   fat: 16.0,
      //   carbs: 49,
      //   protein: 3.9,
      //   iron: '16%'
      // },
      // {
      //   name: 'Jelly bean',
      //   calories: 375,
      //   fat: 0.0,
      //   carbs: 94,
      //   protein: 0.0,
      //   iron: '0%'
      // },
      // {
      //   name: 'Lollipop',
      //   calories: 392,
      //   fat: 0.2,
      //   carbs: 98,
      //   protein: 0,
      //   iron: '2%'
      // },
      // {
      //   name: 'Honeycomb',
      //   calories: 408,
      //   fat: 3.2,
      //   carbs: 87,
      //   protein: 6.5,
      //   iron: '45%'
      // },
      // {
      //   name: 'Donut',
      //   calories: 452,
      //   fat: 25.0,
      //   carbs: 51,
      //   protein: 4.9,
      //   iron: '22%'
      // },
      // {
      //   name: 'KitKat',
      //   calories: 518,
      //   fat: 26.0,
      //   carbs: 65,
      //   protein: 7,
      //   iron: '6%'
      // }
      // ]
    }
  },
  components: {
    WeatherService
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      handler: async function () {
        this.resp = (await WeatherService.index()).data
        this.items = JSON.parse(JSON.stringify(this.resp))
        console.log('data', this.afterResp[0])
        console.log('datahdrs', this.headers)
      }
    }
  }
}
// var arrData = [
//   {
//     id: null,
//     city: null,
//     createdAt: null,
//     updatedAt: null
//   }
// ]

// for (let i = 0; i < 99; i++) {
//   arrData[i]['id'] = this.afterResp[i]['id']
//   arrData[i]['city'] = this.afterResp[i]['city']
//   arrData[i]['createdAt'] = this.afterResp[i]['createdAt']
//   arrData[i]['updatedAt'] = this.afterResp[i]['updatedAt']
// }
</script>

<style lang="css" scoped>
</style>
