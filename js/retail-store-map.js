Vue.component('vue-map', {
    template: '#map',
    props: {
        locations: {
            type: Array,
            default: function() {
                return []
            }
        },
        option: {
            type: Object,
            default: {
                zoom: 16,
                center: {
                    lat: 25.034570,
                    lng: 121.564669
                },
            }
        }
    },
    data: function() {
        return {
            map: {},
            markers: []
        }
    },
    mounted: function() {
        let el = this.$el;
        this.map = new google.maps.Map(el, this.option);

        this.$emit('input', this.map);

        let bounds = new google.maps.LatLngBounds();

        console.log(this.locations);

        for (let i = 0; i < this.locations.length; i++) {
            let position = new google.maps.LatLng(this.locations[i].lat, this.locations[i].lng);
            bounds.extend(position);
            this.setMarker(this.locations[i]);
        }

        this.map.fitBounds(bounds);
    },
    methods: {
        setMarker(pos) {
            let latlng = new google.maps.LatLng(pos.lat, pos.lng);
            let marker = new google.maps.Marker({
                position: latlng,
                map: this.map,
                title: pos.title
            });

            this.markers.push(marker);

            let infoWindow = new google.maps.InfoWindow();
            infoWindow.setContent('<div class="map__info">' + pos.description + '</div>');

            google.maps.event.addListener(marker, 'mouseover', () => {
                infoWindow.open(this.map, marker);
            });

            google.maps.event.addListener(marker, 'mouseout', () => {
                infoWindow.close(this.map, marker);
            });

            google.maps.event.addListener(marker, 'click', () => {
                console.log("abc");
            });
        },
        clearMarker() {
            for (var i = 0; i < this.markers.length; i++) {
                this.markers[i].setMap(null);
            }
            this.marker = [];
        }
    },
    watch: {
        locations: function() {
            this.clearMarker();
            let bounds = new google.maps.LatLngBounds();

            for (let i = 0; i < this.locations.length; i++) {
                let position = new google.maps.LatLng(this.locations[i].lat, this.locations[i].lng);
                bounds.extend(position);
                this.setMarker(this.locations[i]);
            }

            this.map.fitBounds(bounds);
        }
    }
})

let vm = new Vue({
    el: '#app',
    data: {
        locations: [],
        map: null
    },
    created: async function() {
        this.locations = await getPlayTVGameLocation();
    }
});

function getPlayTVGameLocation() {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(playTVGameLocation)
        }, 2000)
    })
}

const playTVGameLocation = [{
    title: '普雷伊-光華門市',
    lat: 25.045220,
    lng: 121.531888,
    description: '台北市中正區市民大道三段 8 號 2 樓 57-58 室',
}, {
    title: '普雷伊-玩具王',
    lat: 25.049005,
    lng: 121.515045,
    description: '台北市中正區市民大道一段 100 號 85 櫃',
}, {
    title: '普雷伊-八德門市',
    lat: 25.044814,
    lng: 121.531335,
    description: '台北市中正區八德路一段 43 巷 28 號 1 樓',
}, {
    title: '普雷伊-忠孝門市',
    lat: 25.044281,
    lng: 121.527438,
    description: '台北市中正區忠孝東路二段 9 號 1 樓',
}, {
    title: '普雷伊-58小舖',
    lat: 25.048821,
    lng: 121.515066,
    description: '台北市中正區市民大道一段 100 號 58 櫃',
}, {
    title: '普雷伊-地下街旗艦店',
    lat: 25.048937,
    lng: 121.515045,
    description: '台北市中正區市民大道一段 100 號 77 櫃（Y18 出口旁）',
}, {
    title: '普雷伊-永和門市',
    lat: 25.014446,
    lng: 121.517547,
    description: '新北市永和區竹林路 44-1 號',
}, {
    title: '普雷伊-萬年二店',
    lat: 25.043861,
    lng: 121.505743,
    description: '台北市中正區西寧南路 70 號 4 樓之 4',
}, {
    title: '普雷伊-西門概念館',
    lat: 25.043822,
    lng: 121.505786,
    description: '台北市中正區西寧南路 70 號 4 樓之 16',
}, {
    title: '普雷伊-三重門市',
    lat: 25.078993,
    lng: 121.483244,
    description: '新北市三重區三和路四段 165-3 號',
}, {
    title: '普雷伊-天母門市',
    lat: 25.117418,
    lng: 121.534040,
    description: '台北市士林區忠誠路 2 段 202 號 1 樓',
}, {
    title: '普雷伊-新莊門市',
    lat: 25.035584,
    lng: 121.448467,
    description: '新北市新莊區中正路 228 號',
}, {
    title: '普雷伊-桃園門市',
    lat: 24.990890,
    lng: 121.313840,
    description: '桃園市桃園區復興路 99 號 1 樓 112 櫃',
}];