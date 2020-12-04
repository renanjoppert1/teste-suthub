<script>
import VueApexCharts from "vue-apexcharts";

export default {
  components: {
    apexchart: VueApexCharts
  },
  name: "Relatorio",
  layout: "admin",
  // carrega a middleware em middleware/auth.js
  middleware: ["auth"],
  data() {
    return {
      regions: ["Africa", "Americas", "Asia", "Europe", "Oceania"],
      regionValue: "",
      countries: [],
      series: [],
      chartOptions: {
        chart: {
          type: "bar"
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              position: "top"
            }
          }
        },
        dataLabels: {
          enabled: true,
          offsetX: -2,
          style: {
            fontSize: "12px",
            colors: ["#000"]
          }
        },
        stroke: {
          show: true,
          width: 1,
          colors: ["#fff"]
        },
        xaxis: {
          categories: []
        }
      }
    };
  },
  watch: {
    regionValue: function(to) {
      if (to == "") {
        return false;
      }
      let region = this.regionValue.toLowerCase();

      this.$axios
        .$get("https://restcountries.eu/rest/v2/region/" + region)
        .then(res => {
          this.countries = res;
          let countries_area = [];
          let countries_population = [];
          res.forEach(el => {
            this.chartOptions.xaxis.categories.push(el.name);
            countries_area.push(el.area);
            countries_population.push(el.population);
          });

          this.series = [
            {
              name: "Population",
              data: countries_population
            },
            {
              name: "Area",
              data: countries_area
            }
          ];

          this.chartOptions.chart.height = res.length * 50;

          this.$refs.countriesChart.updateSeries(this.series);

          this.$refs.countriesChart.updateOptions(this.chartOptions);
        });
    }
  }
};
</script>

<template>
  <div id="relatorio">
    <v-row>
      <v-col>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              Select Region
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in this.regions"
              :key="index"
              @click="regionValue = item"
            >
              <v-list-item-subtitle>{{ item }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-card id="chartArea" v-if="regionValue != ''">
          <p>{{ regionValue }}</p>
          <!-- {{ countries }} -->
          <apexchart
            ref="countriesChart"
            width="100%"
            type="bar"
            :options="chartOptions"
            :series="series"
          ></apexchart>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<style lang="scss" scoped>
#relatorio {
  .v-sheet.v-card {
    padding: 25px;
  }

  #chartArea {
    margin-top: 20px;
    background: #f0f0f0;
    color: #121212;
  }
}
</style>
