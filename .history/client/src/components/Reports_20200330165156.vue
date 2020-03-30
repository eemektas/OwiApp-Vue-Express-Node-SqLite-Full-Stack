<template>
  <div id="Reports">
    <v-card dark class="mt-12">
      <v-card-title>
        <h2>Weather Reports</h2>
        <v-spacer></v-spacer>
        <v-text-field
          class="mr-8"
          v-model="search"
          label="Search"
          single-line
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
        align="center">
        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="item in items" :key="item.id">
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
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
