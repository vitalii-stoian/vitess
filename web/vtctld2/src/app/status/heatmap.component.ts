import { Component, Input, AfterViewInit} from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';

import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { PolymerElement } from '@vaadin/angular2-polymer';

declare var Plotly: any;

@Component({
  moduleId: module.id,
  selector: 'vt-heatmap',
    templateUrl: './heatmap.component.html',
    styleUrls: ['./heatmap.component.css'],
    directives: [
      CORE_DIRECTIVES,
      MD_BUTTON_DIRECTIVES,
      PolymerElement('paper-dropdown-menu'),
      PolymerElement('paper-listbox'),
      PolymerElement('paper-item')
    ]
})

export class HeatmapComponent implements AfterViewInit {
  @Input() data: number[][];
  @Input() yLabels: Array<any>;
  @Input() xLabels: Array<string>;
  @Input() name: string;

  // colorscaleValue defines the gradient for the heatmap.
  private colorscaleValue = [
    [0.0, '#17A234'],
    [0.5, '#A22417'],
    [1.0, '#424141'],
  ];
  private getRowHeight() { return 50; }

  getTotalRows() {
    let height = 0;
    for (let l of this.yLabels) {
      height += l.tabletTypes.length;
    }
    return height;
  }

  ngAfterViewInit() {
    this.drawHeatmap();
    let elem = <any>(document.getElementById(this.name));
    elem.on('plotly_click', function(data){
      alert('clicked');
    });
  }

  drawHeatmap() {
     let chartInfo = [{
       z: this.data,
       x: this.xLabels,
       colorscale: this.colorscaleValue,
       type: 'heatmap',
       showscale: false
     }];

     let xAxisTemplate = {
       type: 'category',
       showgrid: false,
       zeroline: false,
       rangemode: 'nonnegative',
       side: 'top',
       ticks: '',
     };
     let yAxisTemplate = {
       showticklabels: false,
       ticks: '',
       fixedrange: true
     };
     let chartLayout = {
       xaxis: xAxisTemplate,
       yaxis: yAxisTemplate,
       height: (this.getTotalRows() * this.getRowHeight() + 25),
       margin: {
         t: 25,
         b: 0,
         r: 0,
         l: 0
       },
       showlegend: false,
    };

    Plotly.newPlot(this.name, chartInfo, chartLayout, {scrollZoom: true, displayModeBar: false});
  }
}
