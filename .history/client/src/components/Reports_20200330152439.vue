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
        <template v-slot:body="{ items }">
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
      items: []
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
