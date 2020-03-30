<template>
  <div id="Users">
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
        :items="afterResp"
        :search="search"
        type="text">
        <template v-slot:body="{ afterResp }">
          <tbody>
            <tr v-for="resp in afterResp" :key="resp.id">
              <td>{{ resp.id }}</td>
              <td>CONTENT</td>
              <td>CONTENT</td>
              <td>CONTENT</td>
              <td>CONTENT</td>
              <td>CONTENT</td>
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
      resp: {},
      afterResp: {},
      error: null,
      headers: [
        {
          text: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' },
      ],
      search: ''
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
        this.afterResp = JSON.parse(JSON.stringify(this.resp))
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
