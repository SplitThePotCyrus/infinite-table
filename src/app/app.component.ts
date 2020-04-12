import { Component, OnInit } from "@angular/core";
import { Observable, interval } from "rxjs";
import { scan, take } from "rxjs/operators";
import {
  trigger,
  transition,
  style,
  animate,
  state,
  sequence,
  query,
  animateChild,
  group
} from "@angular/animations";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  animations: [
    trigger("xlast", [
      state("true", style({ opacity: 0 })),
      transition("* => true", [style({ opacity: 1 }), animate(".5s ease-in")])
    ]),
    trigger("xroww", [
      // state("void", style({ opacity: 0 })),
      // state("*", style({ opacity: 1 })),
      // transition(":enter", [
      //   query(
      //     "td > *",
      //     [
      //       style({ maxHeight: 0 }),
      //       animate("1s ease-in", style({ maxHeight: "100vh" }))
      //     ],
      //     { delay: 10 }
      //   )
      // ]),
      // state('*', [style({transform: 'translateY(0)'})])
      transition("* => *", [
        group([
          query("tr", [
            style({ transform: "translateY(-100%)" }),
            animateChild(),
            animate(".5s ease-in", style({ transform: "translateY(0)" }))
          ]),
          query("tr:first-child", [
            style({ transform: "perspective(500px) rotate3d(1, 0, 0, 90deg)", transformOrigin: '50% 0%' }),
            animateChild(),
            animate(".5s ease-in", style({ transform: "perspective(1000px) rotate3d(1, 0, 0, 0deg)" }))
          ]),
          // query("tr:first-child > td > * ", [
          //   style({ maxHeight: 0 }),
          //   animateChild(),
          //   animate(".5s ease-in", style({ maxHeight: "100vh" }))
          // ]),
          // query("tr:not(:last-child)", [
          //   style({ transform: "translateY(-100%)" }),
          //   animate(".5s ease-in", style({ transform: "translateY(0)" }))
          // ]),
          // query("tr:last-child", [
          //   style({ transform: "translateY(-100%)", opacity: 1 }),
          //   animate(
          //     ".5s ease-in",
          //     style({ transform: "translateY(0)", opacity: 0 })
          //   )
          // ])
        ])
      ])
      // transition(":leave", [
      //   query("td > *", [
      //     style({ maxHeight: "100vh" }),
      //     animate("1s ease-in", style({ maxHeight: 0 }))
      //   ])
      // ]),
      // transition("* => last", [animate("1s ease-in", style({ opacity: 0 }))])
      // transition(
      //   ":increment",
      //   group([
      //     query(
      //       ":enter > td",
      //       [
      //         style({ opacity: 0 }),
      //         animate("300ms ease-out", style({ opacity: 1 }))
      //       ],
      //       { optional: true }
      //     ),
      //     // query(":leave", animateChild(), { optional: true })
      //     // animate('.3s cubic-bezier(.5, 0, .1, .9)'),
      //   ])
      // )
    ])
  ]
})
export class AppComponent implements OnInit {
  name = "Angular";
  data: Observable<any>;

  ngOnInit() {
    this.data = interval(1000).pipe(
      scan((acc, item) => {
        acc = [...acc, item].sort((a, b) => b - a).slice(0, 11);
        return acc;
      }, [])
    );
  }

  isOdd(value) {
    // console.log(value % 2);
    return value % 2 == 0;
  }
}
