<template>
    <v-app>
        <Navbar />
        <v-main>
            <v-container>
                <v-row>
                    <v-col cols="4">
                        <v-text-field
                            v-model="domain"
                            label="Your domain"
                            clearable
                        ></v-text-field>
                    </v-col>
                    <v-col cols="5">
                        <v-text-field
                            v-model="keywords"
                            label="Keywords"
                            clearable
                        ></v-text-field>
                    </v-col>
                    <v-col cols="3" class="text-center">
                        <v-btn
                            outlined
                            height="44"
                            color="primary"
                            @click="search"
                            >search</v-btn
                        >
                    </v-col>
                    <v-col cols="12" class="text-center">
                        <v-chip color="primary">Search Volume: 301,000</v-chip>

                        <v-chip color="primary" class="mx-5">CPC: 0.5</v-chip>

                        <v-chip color="primary">Difficulty Score: 76.25</v-chip>

                        <v-stepper>
                            <v-stepper-header>
                                <v-stepper-step complete step="1"
                                    >Select SERP Links</v-stepper-step
                                >

                                <v-divider></v-divider>

                                <v-stepper-step step="2"
                                    >Explore Backlink
                                    Opportunities</v-stepper-step
                                >
                            </v-stepper-header>
                        </v-stepper>
                    </v-col>
                </v-row>

                <div ref="table"></div>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import axios from "axios";
import Tabulator from "tabulator-tables";
import Navbar from "./components/Navbar";

export default {
    name: "App",
    components: { Navbar },
    data: () => ({
        domain: "cbdfx.com",
        keywords: "cbd oil",
        tabulator: null,
        tableData: []
    }),

    methods: {
        selectAllRows() {
            console.log(this.tabulator.getSelectedRows());
        },

        search() {
            axios
                .post("https://linksignal.ai/api/v1/serp", {
                    query: this.keywords,
                    domain: this.domain
                })
                .then(res => {
                    this.tableData = res.data.items;
                    console.log(res.data.items);
                })
                .catch(err => console.error(err));
        }
    },

    watch: {
        tableData: {
            handler(newData) {
                this.tabulator.replaceData(newData);
            },
            deep: true
        }
    },

    mounted() {
        this.tabulator = new Tabulator(this.$refs.table, {
            data: this.tableData,
            selectable: true,
            columns: [
                {
                    formatter: "rowSelection",
                    titleFormatter: "rowSelection",
                    cssClass: "pa-7",
                    headerSort: false
                },
                {
                    title: "Rank",
                    field: "position",
                    sorter: "number",
                    width: "auto",
                    cssClass: "pa-7",
                    headerSortTristate: true
                },
                {
                    title: "Page Title",
                    field: "title",
                    sorter: "string",
                    width: 300,
                    cssClass: "pa-7"
                },
                {
                    title: "Link",
                    field: "link",
                    sorter: "string",
                    width: 300,
                    padding: 50,
                    cssClass: "pa-7"
                },
                {
                    title: "Author",
                    field: "lsURLMetrics.author",
                    sorter: "string",
                    width: 200,
                    cssClass: "pa-7"
                },
                {
                    title: "Update Date",
                    field: "lsURLMetrics.articleModifiedTime",
                    sorter: "number",
                    cssClass: "pa-7"
                },
                {
                    title: "Word Count",
                    field: "lsURLMetrics.wordcount",
                    sorter: "date",
                    hozAlign: "center",
                    cssClass: "pa-7"
                },
                {
                    title: "Valid JSON-LD",
                    field: "cheese",
                    sorter: "boolean",
                    hozAlign: "center",
                    formatter: "tickCross",
                    cssClass: "pa-7"
                },
                {
                    title: "PA",
                    field: "urlMetrics.page_authority",
                    sorter: "number",
                    hozAlign: "center",
                    cssClass: "pa-7"
                },
                {
                    title: "DA",
                    field: "urlMetrics.domain_authority",
                    sorter: "number",
                    hozAlign: "center",
                    cssClass: "pa-7"
                },
                {
                    title: "SS",
                    field: "urlMetrics.spam_score",
                    sorter: "boolean",
                    hozAlign: "center",
                    cssClass: "pa-7"
                },
                {
                    title: "UR",
                    field: "page.ahrefs_rank",
                    sorter: "boolean",
                    hozAlign: "center",
                    cssClass: "pa-7"
                },
                {
                    title: "DR",
                    field: "domainRating.domain_rating",
                    sorter: "boolean",
                    hozAlign: "center",
                    cssClass: "pa-7"
                },
                {
                    title: "RD",
                    field: "metricsExtended.Refdomains",
                    sorter: "boolean",
                    hozAlign: "center",
                    cssClass: "pa-7"
                },
                {
                    title: "Backlinks",
                    field: "metricsExtended.Backlinks",
                    sorter: "number",
                    hozAlign: "center",
                    cssClass: "pa-7"
                },
                {
                    title: "Nofollow",
                    field: "metricsExtended.Nofollow",
                    sorter: "number",
                    hozAlign: "center",
                    cssClass: "pa-7"
                },
                {
                    title: "Dofollow",
                    field: "metricsExtended.Dofollow",
                    sorter: "number",
                    hozAlign: "center",
                    cssClass: "pa-7"
                },
                {
                    title: "Text",
                    field: "metricsExtended.Text",
                    sorter: "number",
                    hozAlign: "center",
                    cssClass: "pa-7"
                },
                {
                    title: "Image",
                    field: "metricsExtended.Image",
                    sorter: "number",
                    hozAlign: "center",
                    cssClass: "pa-7"
                }
            ]
        });

        axios
            .post("https://linksignal.ai/api/v1/serp", {
                query: this.keywords,
                domain: this.domain
            })
            .then(res => {
                this.tableData = res.data.items;
                console.log(res.data.items);
            })
            .catch(err => console.error(err));
    }
};
</script>

<style scoped>
.border {
    border: 1px solid black;
}
</style>
