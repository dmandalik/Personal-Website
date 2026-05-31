import { experiences } from "@/data/experiences";

export type TrunkStrand = {
  id: string;
  d: string;
  width?: number;
  opacity?: number;
  delay?: number;
  tone?: "blue" | "cyan" | "violet" | "white";
  role?: "spine" | "edge" | "halo" | "root";
};

export type TrunkWisp = {
  id: string;
  d: string;
  opacity?: number;
  tone?: "blue" | "cyan" | "violet" | "white";
};

export type TreeThread = {
  id: string;
  d: string;
  width?: number;
  opacity?: number;
  hue?: "blue" | "cyan" | "violet" | "white";
};

// Trunk anatomy traced from the reference:
// spine = the dominant white-hot S-curve, edge = close outline spines,
// halo = hairline plasma strands, root = bottom flare/root filaments.
export const trunkStrands: TrunkStrand[] = [
  {
    id: "spine-continuity",
    d: "M472 958 C418 884 378 790 426 694 C470 607 526 560 456 492 C388 426 378 356 414 294 C454 226 430 146 432 -6",
    width: 0.58,
    opacity: 0.9,
    tone: "white",
    role: "spine",
  },
  {
    id: "spine-lower-hot",
    d: "M472 956 C420 884 380 792 426 696 C466 612 520 562 458 496",
    width: 2.85,
    opacity: 1,
    tone: "white",
    role: "spine",
    delay: 0.2,
  },
  {
    id: "spine-mid-hot",
    d: "M458 498 C392 430 379 356 414 294 C454 226 432 156 432 70",
    width: 2.05,
    opacity: 0.94,
    tone: "white",
    role: "spine",
    delay: 0.34,
  },
  {
    id: "spine-upper-hot",
    d: "M432 72 C432 42 436 18 446 -6",
    width: 0.46,
    opacity: 0.62,
    tone: "white",
    role: "spine",
    delay: 0.42,
  },
  {
    id: "spine-secondary-left-lower",
    d: "M424 956 C388 884 396 812 432 738 C466 668 496 612 452 538 C414 476 392 422 416 352",
    width: 1.28,
    opacity: 0.86,
    tone: "white",
    role: "edge",
    delay: 0.46,
  },
  {
    id: "spine-secondary-right-lower",
    d: "M494 954 C464 874 524 806 492 722 C468 656 514 600 488 532 C466 476 494 414 470 350",
    width: 1.05,
    opacity: 0.74,
    tone: "cyan",
    role: "edge",
    delay: 0.48,
  },
  {
    id: "spine-secondary-left-upper",
    d: "M416 354 C450 286 428 218 438 154 C444 100 430 52 438 -2",
    width: 0.72,
    opacity: 0.72,
    tone: "white",
    role: "edge",
    delay: 0.52,
  },
  {
    id: "spine-secondary-right-upper",
    d: "M470 350 C438 282 472 224 458 160 C448 112 464 54 476 -2",
    width: 0.52,
    opacity: 0.48,
    tone: "violet",
    role: "edge",
    delay: 0.56,
  },
  {
    id: "edge-left-bright-lower",
    d: "M400 952 C436 870 382 804 410 724 C436 652 404 586 392 520",
    width: 1.05,
    opacity: 0.7,
    tone: "cyan",
    role: "edge",
    delay: 0.5,
  },
  {
    id: "edge-right-bright-lower",
    d: "M518 946 C474 866 528 800 500 718 C478 650 516 596 490 530",
    width: 0.92,
    opacity: 0.58,
    tone: "violet",
    role: "edge",
    delay: 0.66,
  },
  {
    id: "edge-left-white-lower",
    d: "M424 948 C456 870 400 796 432 716 C464 638 430 572 414 500",
    width: 0.82,
    opacity: 0.82,
    tone: "white",
    role: "edge",
    delay: 0.72,
  },
  {
    id: "edge-right-white-lower",
    d: "M492 950 C456 876 520 806 494 720 C472 648 502 590 480 520",
    width: 0.72,
    opacity: 0.78,
    tone: "white",
    role: "edge",
    delay: 0.78,
  },
  {
    id: "edge-left-upper-blue",
    d: "M394 522 C372 454 382 386 410 318 C438 252 416 184 410 104",
    width: 0.54,
    opacity: 0.55,
    tone: "blue",
    role: "edge",
    delay: 0.86,
  },
  {
    id: "edge-right-upper-violet",
    d: "M486 512 C512 430 488 354 454 286 C426 230 448 150 462 62",
    width: 0.5,
    opacity: 0.48,
    tone: "violet",
    role: "edge",
    delay: 1.02,
  },
  {
    id: "spine-cross-white-a",
    d: "M426 922 C496 834 412 770 452 684 C492 604 446 548 424 482",
    width: 0.86,
    opacity: 0.82,
    tone: "white",
    role: "edge",
    delay: 1.08,
  },
  {
    id: "spine-cross-white-b",
    d: "M488 930 C448 844 520 778 490 700 C462 630 500 572 478 504",
    width: 0.68,
    opacity: 0.72,
    tone: "white",
    role: "edge",
    delay: 1.14,
  },
  {
    id: "spine-cross-white-c",
    d: "M424 526 C392 456 420 382 450 314 C478 254 432 208 432 158",
    width: 0.54,
    opacity: 0.74,
    tone: "white",
    role: "edge",
    delay: 1.25,
  },
  {
    id: "halo-left-wide-low",
    d: "M360 942 C418 874 356 806 394 724 C428 646 394 590 382 520",
    width: 0.5,
    opacity: 0.38,
    tone: "blue",
    role: "halo",
    delay: 1.38,
  },
  {
    id: "halo-right-wide-low",
    d: "M536 930 C486 850 544 780 526 704 C508 632 548 574 530 504",
    width: 0.44,
    opacity: 0.32,
    tone: "violet",
    role: "halo",
    delay: 1.55,
  },
  {
    id: "halo-left-mid-thread",
    d: "M410 722 C446 666 392 610 414 542 C434 480 406 420 422 356 C438 296 418 238 416 180",
    width: 0.38,
    opacity: 0.36,
    tone: "cyan",
    role: "halo",
    delay: 1.62,
  },
  {
    id: "halo-right-mid-thread",
    d: "M496 724 C466 660 510 604 488 534 C466 468 498 410 486 344 C478 292 496 226 510 156",
    width: 0.36,
    opacity: 0.34,
    tone: "violet",
    role: "halo",
    delay: 1.68,
  },
  {
    id: "halo-left-top-thread",
    d: "M420 358 C386 295 398 238 426 178 C444 140 430 94 422 42",
    width: 0.32,
    opacity: 0.34,
    tone: "blue",
    role: "halo",
    delay: 1.72,
  },
  {
    id: "halo-right-top-thread",
    d: "M460 346 C492 284 472 232 458 178 C448 134 470 88 482 30",
    width: 0.3,
    opacity: 0.32,
    tone: "violet",
    role: "halo",
    delay: 1.92,
  },
  {
    id: "halo-inner-blue-a",
    d: "M454 902 C476 820 420 762 440 700 C468 618 446 556 426 500 C402 438 430 376 454 320",
    width: 0.34,
    opacity: 0.42,
    tone: "cyan",
    role: "halo",
    delay: 2.08,
  },
  {
    id: "halo-inner-violet-a",
    d: "M492 888 C456 805 500 742 480 674 C458 590 492 532 500 464 C510 392 474 328 454 262",
    width: 0.32,
    opacity: 0.36,
    tone: "violet",
    role: "halo",
    delay: 2.25,
  },
  {
    id: "halo-inner-white-a",
    d: "M464 914 C486 836 432 776 456 708 C484 640 466 574 444 508 C422 442 444 380 464 324",
    width: 0.32,
    opacity: 0.62,
    tone: "white",
    role: "halo",
    delay: 2.38,
  },
  {
    id: "halo-thin-left-base",
    d: "M382 910 C436 862 402 804 436 744 C464 694 428 640 462 594",
    width: 0.28,
    opacity: 0.34,
    tone: "blue",
    role: "halo",
    delay: 2.45,
  },
  {
    id: "halo-thin-right-base",
    d: "M536 912 C482 842 518 784 526 728 C534 672 544 620 504 572",
    width: 0.28,
    opacity: 0.32,
    tone: "violet",
    role: "halo",
    delay: 2.65,
  },
  {
    id: "root-left-primary",
    d: "M452 928 C404 936 350 950 292 970",
    width: 0.92,
    opacity: 0.46,
    tone: "blue",
    role: "root",
    delay: 2.85,
  },
  {
    id: "root-right-primary",
    d: "M474 928 C536 940 594 960 678 976",
    width: 0.88,
    opacity: 0.42,
    tone: "violet",
    role: "root",
    delay: 3.05,
  },
  {
    id: "root-left-bright",
    d: "M436 906 C390 920 350 934 306 954",
    width: 0.58,
    opacity: 0.48,
    tone: "cyan",
    role: "root",
    delay: 3.25,
  },
  {
    id: "root-right-bright",
    d: "M488 906 C530 922 574 936 626 954",
    width: 0.54,
    opacity: 0.42,
    tone: "white",
    role: "root",
    delay: 3.45,
  },
  {
    id: "root-left-low",
    d: "M420 946 C368 968 326 984 256 992",
    width: 0.42,
    opacity: 0.28,
    tone: "blue",
    role: "root",
    delay: 3.65,
  },
  {
    id: "root-right-low",
    d: "M500 946 C558 970 610 986 704 994",
    width: 0.42,
    opacity: 0.28,
    tone: "violet",
    role: "root",
    delay: 3.76,
  },
  {
    id: "root-left-faint-arc",
    d: "M458 948 C410 972 368 988 312 998",
    width: 0.26,
    opacity: 0.22,
    tone: "cyan",
    role: "root",
    delay: 3.84,
  },
  {
    id: "root-right-faint-arc",
    d: "M472 948 C526 972 592 988 720 1002",
    width: 0.24,
    opacity: 0.22,
    tone: "violet",
    role: "root",
    delay: 3.85,
  },
  {
    id: "root-left-hair",
    d: "M438 934 C382 930 336 926 284 910",
    width: 0.2,
    opacity: 0.2,
    tone: "blue",
    role: "root",
    delay: 4.05,
  },
  {
    id: "root-right-hair",
    d: "M490 934 C548 930 598 926 652 910",
    width: 0.2,
    opacity: 0.2,
    tone: "violet",
    role: "root",
    delay: 4.25,
  },
  {
    id: "root-center-hot",
    d: "M458 958 C460 940 459 924 462 902",
    width: 1.4,
    opacity: 0.86,
    tone: "white",
    role: "root",
    delay: 4.45,
  },
];

export const trunkWisps: TrunkWisp[] = [
  { id: "micro-core-base-1", d: "M421 930 C446 900 454 874 444 842", opacity: 0.46, tone: "white" },
  { id: "micro-core-base-2", d: "M456 934 C430 898 472 866 458 824", opacity: 0.42, tone: "cyan" },
  { id: "micro-core-base-3", d: "M494 926 C468 886 512 850 492 806", opacity: 0.36, tone: "violet" },
  { id: "micro-core-base-4", d: "M394 900 C426 872 412 834 438 794", opacity: 0.32, tone: "blue" },
  { id: "micro-core-low-1", d: "M434 818 C468 784 430 742 462 704", opacity: 0.44, tone: "white" },
  { id: "micro-core-low-2", d: "M504 804 C472 760 526 720 500 676", opacity: 0.36, tone: "cyan" },
  { id: "micro-core-low-3", d: "M416 744 C456 712 428 668 474 632", opacity: 0.34, tone: "blue" },
  { id: "micro-core-low-4", d: "M488 720 C454 676 520 642 492 596", opacity: 0.38, tone: "white" },
  { id: "micro-core-mid-1", d: "M514 612 C484 574 520 532 490 492", opacity: 0.34, tone: "violet" },
  { id: "micro-core-mid-2", d: "M440 580 C472 548 430 508 462 472", opacity: 0.36, tone: "cyan" },
  { id: "micro-core-mid-3", d: "M464 514 C492 480 450 436 474 398", opacity: 0.4, tone: "white" },
  { id: "micro-core-mid-4", d: "M500 462 C474 426 510 388 488 346", opacity: 0.34, tone: "violet" },
  { id: "micro-core-upper-1", d: "M458 372 C490 330 462 292 490 250", opacity: 0.34, tone: "white" },
  { id: "micro-core-upper-2", d: "M506 318 C484 276 512 230 496 184", opacity: 0.3, tone: "violet" },
  { id: "micro-core-upper-3", d: "M482 238 C500 196 482 154 500 106", opacity: 0.3, tone: "blue" },
  { id: "micro-core-upper-4", d: "M504 128 C512 92 522 58 534 24", opacity: 0.28, tone: "white" },
];

export const crownThreads: TreeThread[] = [
  { id: "crown-left-1", d: "M470 316 C434 281 402 260 362 249 C338 242 315 230 294 212", hue: "white", width: 0.8, opacity: 0.5 },
  { id: "crown-left-2", d: "M452 282 C422 240 391 210 350 188 C320 172 294 151 272 125", hue: "blue", width: 0.7, opacity: 0.42 },
  { id: "crown-left-3", d: "M488 218 C463 176 442 140 432 96 C426 70 419 52 399 35", hue: "violet", width: 0.6, opacity: 0.38 },
  { id: "crown-top-left", d: "M473 112 C453 83 449 54 456 22", hue: "white", width: 0.55, opacity: 0.42 },
  { id: "crown-top-right", d: "M504 106 C533 75 546 42 548 7", hue: "violet", width: 0.58, opacity: 0.44 },
  { id: "crown-right-1", d: "M496 252 C535 216 564 181 588 132 C603 100 621 72 650 46", hue: "white", width: 0.75, opacity: 0.48 },
  { id: "crown-right-2", d: "M510 187 C546 150 565 104 574 55", hue: "violet", width: 0.65, opacity: 0.42 },
  { id: "crown-right-3", d: "M495 296 C545 268 582 236 611 191 C632 158 654 136 684 120", hue: "blue", width: 0.72, opacity: 0.42 },
];

export const sideThreads: TreeThread[] = [
  { id: "left-mid-1", d: "M471 405 C430 371 389 350 342 335 C309 324 280 306 253 282", hue: "white", width: 0.78, opacity: 0.5 },
  { id: "left-mid-2", d: "M454 447 C399 419 356 395 312 360 C287 341 261 326 231 318", hue: "violet", width: 0.7, opacity: 0.42 },
  { id: "left-mid-3", d: "M452 530 C394 499 349 465 309 424 C281 395 252 374 215 363", hue: "blue", width: 0.72, opacity: 0.46 },
  { id: "left-low-1", d: "M435 603 C379 585 335 554 294 516 C263 487 235 470 198 460", hue: "cyan", width: 0.7, opacity: 0.4 },
  { id: "left-low-2", d: "M449 658 C397 650 352 631 311 600 C279 576 246 564 210 566", hue: "white", width: 0.78, opacity: 0.48 },
  { id: "right-mid-1", d: "M503 373 C553 340 596 316 646 301 C679 291 710 272 739 246", hue: "violet", width: 0.8, opacity: 0.48 },
  { id: "right-mid-2", d: "M522 429 C577 402 621 371 658 330 C683 303 709 282 740 266", hue: "violet", width: 0.72, opacity: 0.42 },
  { id: "right-mid-3", d: "M500 502 C554 482 611 452 660 412 C696 382 733 357 780 336", hue: "white", width: 0.7, opacity: 0.42 },
  { id: "right-low-1", d: "M512 578 C571 562 622 535 670 496 C705 467 738 447 776 438", hue: "blue", width: 0.72, opacity: 0.42 },
  { id: "right-low-2", d: "M489 690 C541 673 587 643 628 599 C656 568 689 546 727 534", hue: "cyan", width: 0.7, opacity: 0.38 },
  { id: "right-low-3", d: "M502 735 C560 713 605 682 652 638 C682 610 713 591 750 586", hue: "white", width: 0.78, opacity: 0.44 },
];

export const hairlineThreads: TreeThread[] = [
  { id: "hair-1", d: "M362 249 C339 235 319 223 300 197", hue: "blue" },
  { id: "hair-2", d: "M347 188 C330 158 325 129 329 95", hue: "violet" },
  { id: "hair-3", d: "M588 132 C616 124 639 109 661 84", hue: "white" },
  { id: "hair-4", d: "M574 55 C591 42 602 25 608 2", hue: "violet" },
  { id: "hair-5", d: "M342 335 C314 342 288 337 259 322", hue: "blue" },
  { id: "hair-6", d: "M646 301 C672 313 699 310 729 294", hue: "violet" },
  { id: "hair-7", d: "M658 330 C686 336 709 329 733 309", hue: "white" },
  { id: "hair-8", d: "M660 412 C686 421 714 414 744 394", hue: "blue" },
  { id: "hair-9", d: "M309 424 C278 425 250 413 222 391", hue: "violet" },
  { id: "hair-10", d: "M294 516 C265 511 237 495 209 466", hue: "cyan" },
  { id: "hair-11", d: "M628 599 C655 600 681 588 708 562", hue: "white" },
  { id: "hair-12", d: "M652 638 C682 648 713 642 746 620", hue: "blue" },
  { id: "hair-13", d: "M337 835 C316 824 297 806 281 780", hue: "cyan" },
  { id: "hair-14", d: "M664 862 C698 855 728 859 760 878", hue: "violet" },
  { id: "hair-15", d: "M296 899 C266 893 241 879 218 856", hue: "blue" },
  { id: "hair-16", d: "M672 912 C707 914 738 928 768 955", hue: "white" },
  { id: "hair-17", d: "M377 139 C361 132 346 118 334 96", hue: "violet" },
  { id: "hair-18", d: "M611 191 C636 188 660 177 684 153", hue: "blue" },
  { id: "hair-19", d: "M284 663 C256 671 232 668 204 652", hue: "cyan" },
  { id: "hair-20", d: "M648 559 C678 559 704 550 730 528", hue: "white" },
  { id: "hair-21", d: "M352 478 C327 476 302 463 276 438", hue: "blue" },
  { id: "hair-22", d: "M558 448 C584 452 608 443 634 421", hue: "violet" },
];

export const microCrackleThreads: TreeThread[] = [
  { id: "crackle-1", d: "M455 248 L438 231 L421 226 L405 211", hue: "blue", width: 0.44, opacity: 0.34 },
  { id: "crackle-2", d: "M486 264 L504 247 L513 229 L536 213", hue: "violet", width: 0.46, opacity: 0.38 },
  { id: "crackle-3", d: "M463 318 L443 307 L426 289 L403 281", hue: "white", width: 0.42, opacity: 0.42 },
  { id: "crackle-4", d: "M496 332 L517 315 L542 309 L559 290", hue: "blue", width: 0.42, opacity: 0.36 },
  { id: "crackle-5", d: "M445 385 L421 374 L404 354 L382 349", hue: "violet", width: 0.4, opacity: 0.35 },
  { id: "crackle-6", d: "M506 402 L530 391 L543 371 L568 362", hue: "white", width: 0.44, opacity: 0.4 },
  { id: "crackle-7", d: "M466 455 L448 435 L431 426 L410 404", hue: "cyan", width: 0.42, opacity: 0.38 },
  { id: "crackle-8", d: "M492 468 L514 451 L540 442 L558 421", hue: "violet", width: 0.42, opacity: 0.36 },
  { id: "crackle-9", d: "M439 506 L412 492 L391 469 L366 458", hue: "blue", width: 0.42, opacity: 0.36 },
  { id: "crackle-10", d: "M511 522 L538 512 L559 493 L591 484", hue: "white", width: 0.42, opacity: 0.38 },
  { id: "crackle-11", d: "M458 555 L431 542 L411 520 L383 509", hue: "violet", width: 0.4, opacity: 0.35 },
  { id: "crackle-12", d: "M493 580 L521 562 L545 555 L568 532", hue: "cyan", width: 0.42, opacity: 0.37 },
  { id: "crackle-13", d: "M431 612 L403 607 L379 589 L349 585", hue: "white", width: 0.42, opacity: 0.39 },
  { id: "crackle-14", d: "M514 626 L545 614 L568 592 L602 584", hue: "blue", width: 0.42, opacity: 0.35 },
  { id: "crackle-15", d: "M454 660 L424 647 L398 627 L365 618", hue: "cyan", width: 0.4, opacity: 0.36 },
  { id: "crackle-16", d: "M487 690 L516 674 L548 665 L576 639", hue: "violet", width: 0.42, opacity: 0.37 },
  { id: "crackle-17", d: "M431 724 L399 719 L371 702 L337 700", hue: "blue", width: 0.42, opacity: 0.34 },
  { id: "crackle-18", d: "M503 746 L536 735 L561 712 L598 705", hue: "white", width: 0.42, opacity: 0.38 },
  { id: "crackle-19", d: "M447 782 L415 793 L384 792 L352 807", hue: "violet", width: 0.32, opacity: 0.25 },
  { id: "crackle-20", d: "M486 802 L518 816 L552 815 L585 831", hue: "cyan", width: 0.32, opacity: 0.27 },
  { id: "crackle-21", d: "M430 840 L396 859 L365 864 L330 884", hue: "blue", width: 0.34, opacity: 0.27 },
  { id: "crackle-22", d: "M493 850 L528 872 L565 879 L600 902", hue: "violet", width: 0.34, opacity: 0.28 },
  { id: "crackle-23", d: "M458 318 L472 292 L470 268 L486 242", hue: "white", width: 0.3, opacity: 0.36 },
  { id: "crackle-24", d: "M481 438 L464 415 L462 390 L446 365", hue: "cyan", width: 0.3, opacity: 0.32 },
  { id: "crackle-25", d: "M475 528 L496 507 L501 478 L520 455", hue: "white", width: 0.3, opacity: 0.34 },
  { id: "crackle-26", d: "M466 622 L447 600 L442 571 L424 548", hue: "violet", width: 0.3, opacity: 0.3 },
  { id: "crackle-27", d: "M475 718 L496 695 L501 668 L520 642", hue: "blue", width: 0.3, opacity: 0.29 },
  { id: "crackle-28", d: "M462 820 L442 800 L439 769 L421 746", hue: "white", width: 0.3, opacity: 0.31 },
];

export const rootThreads: TreeThread[] = [
  { id: "root-1", d: "M455 876 C410 920 356 940 286 952", hue: "blue", width: 0.9, opacity: 0.58 },
  { id: "root-2", d: "M474 884 C535 922 598 939 690 950", hue: "violet", width: 0.9, opacity: 0.58 },
  { id: "root-3", d: "M438 901 C395 934 356 959 304 974", hue: "cyan", width: 0.68, opacity: 0.42 },
  { id: "root-4", d: "M490 902 C535 932 575 958 640 971", hue: "white", width: 0.68, opacity: 0.42 },
  { id: "root-5", d: "M446 875 C403 889 360 897 316 898", hue: "blue", width: 0.58, opacity: 0.38 },
  { id: "root-6", d: "M477 876 C526 887 571 904 616 928", hue: "violet", width: 0.58, opacity: 0.38 },
  { id: "root-7", d: "M459 854 C427 876 391 889 346 895", hue: "cyan", width: 0.56, opacity: 0.34 },
  { id: "root-8", d: "M468 852 C511 875 553 889 602 899", hue: "white", width: 0.56, opacity: 0.34 },
  { id: "root-9", d: "M444 918 C407 940 365 957 316 966", hue: "blue", width: 0.52, opacity: 0.32 },
  { id: "root-10", d: "M489 917 C534 943 583 960 645 973", hue: "violet", width: 0.52, opacity: 0.32 },
];

export const sparkPoints = [
  [429, 248, 0.7],
  [470, 324, 0.55],
  [508, 390, 0.48],
  [414, 493, 0.45],
  [536, 512, 0.5],
  [442, 612, 0.42],
  [496, 682, 0.5],
  [452, 752, 0.45],
  [386, 437, 0.32],
  [611, 333, 0.34],
  [341, 586, 0.3],
  [666, 586, 0.34],
  [304, 224, 0.28],
  [606, 142, 0.3],
  [308, 848, 0.28],
  [655, 892, 0.26],
] as const;

// ---------------------------------------------------------------------------
// Hair-fine fractal filaments
// Deterministically generated (seeded PRNG) so the dense canopy spray is stable
// across renders/builds. These mimic the thousands of fine plasma threads in
// the reference render: dense and upward-fanning near the crown, drooping near
// the roots, fading out toward the tips.
// ---------------------------------------------------------------------------

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const clamp = (n: number, lo: number, hi: number) => Math.min(Math.max(n, lo), hi);
const round1 = (n: number) => Math.round(n * 10) / 10;

// Approximate x of the spine S-curve for a given y (viewBox 0..980).
function spineX(y: number) {
  return 452 + 14 * Math.sin((y - 80) / 150) + 10 * Math.sin((y - 200) / 70);
}

const fineHuePalette: NonNullable<TreeThread["hue"]>[] = [
  "blue",
  "blue",
  "white",
  "white",
  "cyan",
  "violet",
];

function buildFineFilaments(): TreeThread[] {
  const rand = mulberry32(20260529);
  const range = (a: number, b: number) => a + rand() * (b - a);
  const pick = <T,>(arr: readonly T[]) => arr[Math.floor(rand() * arr.length)];
  const jitter = () => range(-13, 13);
  const out: TreeThread[] = [];

  // Tier 1 — spray filaments fanning directly off the spine. These are the
  // backbone of the bushy crown, so there are many of them, weighted hard
  // toward the upper canopy and reaching well outward + upward like the
  // reference's dense Lichtenberg burst.
  const sprayCount = 320;
  for (let i = 0; i < sprayCount; i++) {
    const u = rand();
    const oy = 60 + Math.pow(u, 0.78) * 860; // weighted toward the crown
    const baseX = spineX(oy);
    const side = rand() < 0.5 ? -1 : 1;
    const ox = baseX + side * range(0, 10);

    const reachX = side * range(60, 250) * (0.7 + 0.5 * rand());
    let dy: number;
    if (oy < 460) {
      dy = -range(80, 300) * (0.6 + (460 - oy) / 460); // crown sprays upward
    } else if (oy < 720) {
      dy = -range(30, 150); // mid: gentle lift
    } else {
      dy = range(10, 130); // low: drooping toward roots
    }

    const c1x = ox + reachX * 0.3 + jitter();
    const c1y = oy + dy * 0.35 + jitter();
    const c2x = ox + reachX * 0.72 + jitter();
    const c2y = oy + dy * 0.78 + jitter();
    const ex = ox + reachX + jitter();
    const ey = oy + dy + jitter();

    out.push({
      id: `fine-spray-${i}`,
      d: `M${round1(ox)} ${round1(oy)} C${round1(c1x)} ${round1(c1y)} ${round1(c2x)} ${round1(c2y)} ${round1(ex)} ${round1(ey)}`,
      width: range(0.16, 0.42),
      opacity: clamp(range(0.18, 0.4) + (oy < 460 ? 0.08 : 0), 0.12, 0.46),
      hue: pick(fineHuePalette),
    });
  }

  // Tier 2 — micro tips out in the canopy that sprout into finer hairs,
  // thickening the body of the crown between the main sprays.
  const microCount = 260;
  for (let i = 0; i < microCount; i++) {
    const u = rand();
    const oy = 60 + Math.pow(u, 0.85) * 740; // mostly upper-mid canopy
    const baseX = spineX(oy);
    const side = rand() < 0.5 ? -1 : 1;
    const ox = baseX + side * range(40, 220);

    const reachX = side * range(14, 84);
    const dy = oy < 460 ? -range(24, 120) : range(-44, 70);

    const c1x = ox + reachX * 0.4 + jitter();
    const c1y = oy + dy * 0.45 + jitter();
    const ex = ox + reachX + jitter();
    const ey = oy + dy + jitter();

    out.push({
      id: `fine-micro-${i}`,
      d: `M${round1(ox)} ${round1(oy)} Q${round1(c1x)} ${round1(c1y)} ${round1(ex)} ${round1(ey)}`,
      width: range(0.12, 0.26),
      opacity: clamp(range(0.12, 0.26), 0.08, 0.28),
      hue: pick(fineHuePalette),
    });
  }

  // Tier 3 — hair-fine upward whiskers packed into the crown. Short, nearly
  // vertical, and dense, they give the upper canopy the soft fuzzy glow halo
  // that reads as a solid bushy crown in the reference rather than discrete
  // strands.
  const crownHairCount = 240;
  for (let i = 0; i < crownHairCount; i++) {
    const u = rand();
    const oy = 50 + Math.pow(u, 1.1) * 430; // tightly packed in the crown
    const baseX = spineX(oy);
    const side = rand() < 0.5 ? -1 : 1;
    const spread = range(10, 215) * (0.5 + 0.7 * (1 - oy / 480));
    const ox = baseX + side * spread;

    const len = range(20, 70);
    const reachX = side * range(2, 26);
    const ex = ox + reachX + range(-6, 6);
    const ey = oy - len; // whiskers point up toward the crown
    const cx = ox + reachX * 0.5 + range(-8, 8);
    const cy = oy - len * 0.55;

    out.push({
      id: `fine-crownhair-${i}`,
      d: `M${round1(ox)} ${round1(oy)} Q${round1(cx)} ${round1(cy)} ${round1(ex)} ${round1(ey)}`,
      width: range(0.08, 0.18),
      opacity: clamp(range(0.1, 0.24), 0.07, 0.26),
      hue: pick(fineHuePalette),
    });
  }

  return out;
}

export const fineFilaments: TreeThread[] = buildFineFilaments();

// ---------------------------------------------------------------------------
// Compact braided trunk
// A single serpentine spine with a few strands helixing tightly around it,
// width-banded so the ribbon tapers as it rises. Colour is supplied at render
// time via the vertical #trunkLife / #trunkCore / #trunkHalo gradients.
// ---------------------------------------------------------------------------

export type TrunkBraidStrand = {
  id: string;
  d: string;
  width: number;
  opacity: number;
  kind: "halo" | "shade" | "wrap" | "bright" | "core" | "hot" | "crackle" | "crackleSoft";
};

const TRUNK_Y_BOTTOM = 966;
const TRUNK_Y_TOP = 48;

// Horizontal offset of the trunk centre-line from x=458 (+ = right). Traced
// directly off the reference close-up (TrunkZoomedIn.png) by sampling the
// brightest white-hot pixel per row, bottom -> top. The bends are sharp and
// localized — a strong rightward bulge near t=0.4 and a hard sweep left near
// t=0.6 — which is what makes the reference read as so "bendy".
export const TRUNK_CENTRE_X = 458;
export const TRUNK_OFFSETS: ReadonlyArray<readonly [number, number]> = [
  [0.0, 23.5],
  [0.08, -11.7],
  [0.18, 8.6],
  [0.3, 65.4],
  [0.4, 90.3],
  [0.48, 69.3],
  [0.55, 4.2],
  [0.62, -31],
  [0.69, -19.3],
  [0.76, 5.7],
  [0.83, 21.7],
  [0.9, 14.1],
  [0.96, 5.2],
  [1.0, 4.1],
];

function catmullRom(p0: number, p1: number, p2: number, p3: number, u: number) {
  const u2 = u * u;
  const u3 = u2 * u;
  return (
    0.5 *
    (2 * p1 + (-p0 + p2) * u + (2 * p0 - 5 * p1 + 4 * p2 - p3) * u2 + (-p0 + 3 * p1 - 3 * p2 + p3) * u3)
  );
}

// Smoothly interpolate the traced offsets with a Catmull-Rom spline.
function trunkOffset(t: number) {
  const pts = TRUNK_OFFSETS;
  let i = 0;
  while (i < pts.length - 1 && t > pts[i + 1][0]) i++;
  const x0 = pts[Math.max(0, i - 1)][1];
  const x1 = pts[i][1];
  const x2 = pts[Math.min(pts.length - 1, i + 1)][1];
  const x3 = pts[Math.min(pts.length - 1, i + 2)][1];
  const span = pts[Math.min(pts.length - 1, i + 1)][0] - pts[i][0] || 1;
  const u = clamp((t - pts[i][0]) / span, 0, 1);
  return catmullRom(x0, x1, x2, x3, u);
}

// Centre-line of the trunk (t: 0 = base, 1 = crown).
function trunkSpine(t: number) {
  const y = TRUNK_Y_BOTTOM - t * (TRUNK_Y_BOTTOM - TRUNK_Y_TOP);
  const x = TRUNK_CENTRE_X + trunkOffset(t);
  return { x, y };
}

// Unit normal to the spine, used to offset the helixing strands sideways.
function trunkNormal(t: number) {
  const e = 0.0015;
  const a = trunkSpine(Math.max(0, t - e));
  const b = trunkSpine(Math.min(1, t + e));
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  return { nx: -dy / len, ny: dx / len };
}

// --- Public trunk-geometry helpers ----------------------------------------
// Exposed so the experience branches can anchor seamlessly onto the SAME live
// trunk spine (rather than hard-coded coordinates that drift when the trunk is
// retuned). t runs 0 = base -> 1 = crown.
export const TRUNK_BASE_Y = TRUNK_Y_BOTTOM;
export const TRUNK_TOP_Y = TRUNK_Y_TOP;
export const TRUNK_BASE_X = TRUNK_CENTRE_X;

export function trunkPointAtT(t: number): { x: number; y: number } {
  return trunkSpine(clamp(t, 0, 1));
}

// The spine's y is linear in t, so y -> t is a direct inverse.
export function trunkTForY(y: number): number {
  return clamp((TRUNK_Y_BOTTOM - y) / (TRUNK_Y_BOTTOM - TRUNK_Y_TOP), 0, 1);
}

export function trunkPointAtY(y: number): { x: number; y: number } {
  return trunkSpine(trunkTForY(y));
}

export function trunkNormalAtT(t: number): { nx: number; ny: number } {
  return trunkNormal(clamp(t, 0, 1));
}

// --- Editor-only live-preview helpers --------------------------------------
// Parameterized variants of the trunk math so the drag editor can preview a
// candidate set of offsets without mutating the baked TRUNK_OFFSETS. The
// production render never calls these.
type OffsetPairs = ReadonlyArray<readonly [number, number]>;

function offsetAtFrom(pts: OffsetPairs, t: number) {
  let i = 0;
  while (i < pts.length - 1 && t > pts[i + 1][0]) i++;
  const x0 = pts[Math.max(0, i - 1)][1];
  const x1 = pts[i][1];
  const x2 = pts[Math.min(pts.length - 1, i + 1)][1];
  const x3 = pts[Math.min(pts.length - 1, i + 2)][1];
  const span = pts[Math.min(pts.length - 1, i + 1)][0] - pts[i][0] || 1;
  const u = clamp((t - pts[i][0]) / span, 0, 1);
  return catmullRom(x0, x1, x2, x3, u);
}

export function trunkSpineFrom(offsets: OffsetPairs, t: number): Pt2 {
  const y = TRUNK_Y_BOTTOM - clamp(t, 0, 1) * (TRUNK_Y_BOTTOM - TRUNK_Y_TOP);
  const x = TRUNK_CENTRE_X + offsetAtFrom(offsets, clamp(t, 0, 1));
  return { x, y };
}

// SVG path string for the trunk centre-line given a candidate offset set.
export function trunkCenterlinePath(offsets: OffsetPairs, steps = 160): string {
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const p = trunkSpineFrom(offsets, t);
    d += i === 0 ? `M${round1(p.x)} ${round1(p.y)}` : ` L${round1(p.x)} ${round1(p.y)}`;
  }
  return d;
}

type TrunkStrandSpec = {
  id: string;
  amp: number;
  twist: number;
  phase: number;
  baseOffset?: number;
  width: number;
  opacity: number;
  kind: TrunkBraidStrand["kind"];
};

function trunkStrandPath(spec: Pick<TrunkStrandSpec, "amp" | "twist" | "phase" | "baseOffset">, tStart: number, tEnd: number) {
  const steps = 28;
  let d = "";
  for (let i = 0; i <= steps; i++) {
    const t = tStart + (tEnd - tStart) * (i / steps);
    const s = trunkSpine(t);
    const n = trunkNormal(t);
    // Amplitude compresses toward the crown (compact top) but flares back out in
    // the bottom ~10% so the white-hot base spreads like the reference root.
    const taper = (1 - 0.72 * t) + 0.5 * Math.exp(-t * 16);
    const off =
      ((spec.baseOffset ?? 0) + spec.amp * Math.sin(t * Math.PI * spec.twist + spec.phase)) * taper;
    const x = s.x + n.nx * off;
    const y = s.y + n.ny * off;
    d += i === 0 ? `M${round1(x)} ${round1(y)}` : ` L${round1(x)} ${round1(y)}`;
  }
  return d;
}

function buildTrunkBraid(): TrunkBraidStrand[] {
  const specs: TrunkStrandSpec[] = [
    // Halo layers (painted first, behind everything) — soft blue/violet bloom,
    // widest and brightest at the white-hot base via the amplitude taper.
    { id: "halo-wide", amp: 0, twist: 0, phase: 0, width: 30, opacity: 0.26, kind: "halo" },
    { id: "halo-mid", amp: 0, twist: 0, phase: 0, width: 16, opacity: 0.4, kind: "halo" },
    { id: "halo-tight", amp: 0, twist: 0, phase: 0, width: 8, opacity: 0.56, kind: "halo" },
    // Crisp shading band — a tight, soft-edged colour body that hugs the spine
    // and fades fast (crispShade filter). Coloured by the vertical life-gradient
    // so it samples the local plasma colour at each height. Two stacked widths:
    // a fuller inner shade and a tighter, brighter contour.
    { id: "shade-wide", amp: 0, twist: 0, phase: 0, width: 12, opacity: 0.4, kind: "shade" },
    { id: "shade-tight", amp: 0, twist: 0, phase: 0, width: 6, opacity: 0.5, kind: "shade" },
    // White-hot heart — a crisp, bright core that *outlines* the shape (like the
    // reference's single hot strand). It is the hero contour line, not a fat rope.
    { id: "hot", amp: 0, twist: 0, phase: 0, width: 3.2, opacity: 1, kind: "hot" },
    { id: "core-a", amp: 2, twist: 4.6, phase: 0.4, width: 1.7, opacity: 0.98, kind: "core" },
    { id: "core-b", amp: 2, twist: 4.6, phase: Math.PI + 0.4, width: 1.5, opacity: 0.96, kind: "core" },
    // Blue & violet strands twisting in a CLOSE radius around the white heart —
    // these build the coloured body of the trunk without masking the contour.
    { id: "bright-a", amp: 5, twist: 5.0, phase: 0, width: 2.4, opacity: 0.9, kind: "bright" },
    { id: "bright-b", amp: 5, twist: 5.0, phase: Math.PI, width: 2.2, opacity: 0.88, kind: "bright" },
    { id: "bright-c", amp: 8, twist: 5.4, phase: 1.7, width: 1.8, opacity: 0.82, kind: "bright" },
    { id: "bright-d", amp: 8, twist: 5.4, phase: 1.7 + Math.PI, width: 1.6, opacity: 0.8, kind: "bright" },
    // Mid wraps — still hugging tight.
    { id: "wrap-a", amp: 10, twist: 5.8, phase: 0.9, width: 1.3, opacity: 0.66, kind: "wrap" },
    { id: "wrap-b", amp: 12, twist: 5.6, phase: 2.6, width: 1.2, opacity: 0.62, kind: "wrap" },
    { id: "wrap-c", amp: 9, twist: 6.2, phase: 4.3, width: 1.05, opacity: 0.6, kind: "wrap" },
    // Outermost fine wraps — the widest, but still a close radius. Crackle so
    // their edges break up into grain instead of reading as smooth tubes.
    { id: "fine-a", amp: 14, twist: 6.4, phase: 1.4, width: 0.54, opacity: 0.44, kind: "crackle" },
    { id: "fine-b", amp: 11, twist: 6.0, phase: 3.3, width: 0.5, opacity: 0.42, kind: "crackle" },
    { id: "fine-c", amp: 16, twist: 6.8, phase: 5.0, width: 0.46, opacity: 0.38, kind: "crackle" },
  ];

  // Overlapping width bands so the ribbon thins gracefully as it rises while
  // keeping a substantial, luminous column.
  const bands: [number, number, number][] = [
    [0, 0.5, 1],
    [0.44, 0.8, 0.6],
    [0.74, 1, 0.34],
  ];

  const out: TrunkBraidStrand[] = [];
  for (const spec of specs) {
    bands.forEach(([t0, t1, wf], b) => {
      out.push({
        id: `trunk-${spec.id}-b${b}`,
        d: trunkStrandPath(spec, t0, t1),
        width: spec.width * wf,
        opacity: spec.opacity,
        kind: spec.kind,
      });
    });
  }

  // Dense field of hair-thin crackle filaments running over broken, random
  // spans of the trunk. This is what gives the column its fine grainy texture
  // and "clarity" — many discrete sparks rather than a few smooth ribbons.
  const rng = mulberry32(0x5eed29);
  const FINE_COUNT = 66;
  for (let k = 0; k < FINE_COUNT; k++) {
    const span = 0.18 + rng() * 0.42; // each filament covers a short stretch
    const tStart = rng() * (1 - span);
    const tEnd = tStart + span;
    const wide = rng() < 0.28; // a few coarser, softer threads
    out.push({
      id: `trunk-crackle-${k}`,
      d: trunkStrandPath(
        {
          amp: (wide ? 12 : 4) + rng() * (wide ? 14 : 13),
          twist: 4.5 + rng() * 3.5,
          phase: rng() * Math.PI * 2,
          baseOffset: (rng() - 0.5) * (wide ? 14 : 8),
        },
        tStart,
        tEnd,
      ),
      width: wide ? 0.7 + rng() * 0.6 : 0.26 + rng() * 0.34,
      opacity: (wide ? 0.16 : 0.3) + rng() * 0.24,
      kind: wide ? "crackleSoft" : "crackle",
    });
  }
  return out;
}

export const trunkBraid: TrunkBraidStrand[] = buildTrunkBraid();

// ---------------------------------------------------------------------------
// Trunk halo grain
// A dense field of tiny multicolored "pixels" packed tightly around the spine.
// This is what gives the trunk its body/thickness and the grainy, sparkling
// halo from the reference close-up: white/cyan nearest the white-hot core,
// electric blue in the mid band, violet/purple at the outer edge. The band
// tapers with the trunk (widest + brightest at the white-hot base).
// ---------------------------------------------------------------------------
export type TrunkHaloPixel = {
  x: number;
  y: number;
  r: number;
  hue: "blue" | "cyan" | "violet" | "white";
  opacity: number;
};

function buildTrunkHaloPixels(): TrunkHaloPixel[] {
  const rng = mulberry32(0x9a10c7);
  const pix: TrunkHaloPixel[] = [];
  const STEPS = 560;
  for (let i = 0; i <= STEPS; i++) {
    const t = i / STEPS;
    const n = trunkNormal(t);
    // Real-tree silhouette: wide at the base, narrowing steadily toward a
    // sharp crown tip. The grain band tightens around the spine as it climbs.
    const taper = (1 - 0.72 * t) + 0.5 * Math.exp(-t * 9);
    const halfW = 6 + 26 * taper; // ~45px at base -> ~13px at crown
    // Thin out toward the crown so the tip reads sharp, dense at the base.
    const perStep = 2 + Math.floor(rng() * (3 - 1.2 * t)); // ~2-4 base, ~2 crown
    for (let k = 0; k < perStep; k++) {
      // Cluster density toward the spine so the core stays the brightest.
      const frac = Math.pow(rng(), 1.5);
      const side = rng() < 0.5 ? -1 : 1;
      const off = side * frac * halfW + (rng() - 0.5) * 1.2;
      const along = (rng() - 0.5) * (1.8 / STEPS);
      const sj = trunkSpine(clamp(t + along, 0, 1));
      const x = sj.x + n.nx * off;
      const y = sj.y + n.ny * off;
      // Colour by distance from the core: white/cyan -> blue -> violet.
      let hue: TrunkHaloPixel["hue"];
      if (frac < 0.3) hue = rng() < 0.6 ? "white" : "cyan";
      else if (frac < 0.64) hue = rng() < 0.58 ? "blue" : "cyan";
      else hue = rng() < 0.52 ? "violet" : "blue";
      // Smaller, sharper pixels (was 0.5 + .. * 1.3); crown pixels shrink too.
      const r = 0.32 + rng() * (0.78 - 0.32 * frac) * (1 - 0.22 * t);
      const opacity = clamp(0.42 + rng() * 0.5 - frac * 0.14, 0.14, 0.96);
      pix.push({ x: round1(x), y: round1(y), r: round1(r), hue, opacity });
    }
  }
  return pix;
}

export const trunkHaloPixels: TrunkHaloPixel[] = buildTrunkHaloPixels();

// --- Lightning arcs -------------------------------------------------------
// Jagged bolts that briefly arc off the trunk like an electric discharge. They
// are hidden almost all the time and flash on rarely (see .lightning-bolt CSS),
// in a few different colour ranges, for a tasteful occasional strike.
export type LightningArc = {
  id: string;
  d: string; // main bolt path (jagged, tapering to a sharp tip)
  fork?: string; // optional forked branch path
  color: string; // sampled from the trunk where the bolt touches
  width: number;
  ox: number; // strike origin x (where the accompanying flash blooms)
  oy: number; // strike origin y
  flashR: number; // origin flash radius (small + crisp)
  dur: number; // full cycle length in seconds (long -> infrequent)
  delay: number; // negative start offset so strikes are scattered in time
};

// Colour stops of the #trunkLife gradient (offset, rgb). Because that gradient
// runs y=966 (base) -> y=44 (crown) and the spine maps t linearly across the
// same span, the gradient offset is ~= the trunk parameter t. So sampling here
// at a bolt's origin t gives the exact trunk colour where the bolt touches.
const TRUNK_LIFE_STOPS: ReadonlyArray<readonly [number, readonly [number, number, number]]> = [
  [0, [255, 255, 255]],
  [0.14, [242, 247, 255]],
  [0.32, [207, 228, 255]],
  [0.5, [147, 197, 253]],
  [0.66, [96, 165, 250]],
  [0.8, [99, 102, 241]],
  [0.92, [139, 92, 246]],
  [1, [167, 139, 250]],
];

function sampleTrunkColor(t: number): string {
  const c = clamp(t, 0, 1);
  let i = 0;
  while (i < TRUNK_LIFE_STOPS.length - 1 && c > TRUNK_LIFE_STOPS[i + 1][0]) i++;
  const [o0, a] = TRUNK_LIFE_STOPS[i];
  const [o1, b] = TRUNK_LIFE_STOPS[Math.min(i + 1, TRUNK_LIFE_STOPS.length - 1)];
  const f = o1 === o0 ? 0 : (c - o0) / (o1 - o0);
  const mix = (j: number) => Math.round(a[j] + (b[j] - a[j]) * f);
  return `#${[mix(0), mix(1), mix(2)].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

function buildLightning(): LightningArc[] {
  const rng = mulberry32(0xb017ed);
  const arcs: LightningArc[] = [];
  const N = 5;
  for (let i = 0; i < N; i++) {
    // Anchor the bolt somewhere along the upper two-thirds of the trunk.
    const t0 = 0.28 + rng() * 0.6;
    const dir = rng() < 0.5 ? -1 : 1; // shoot left or right
    const start = trunkSpine(t0);
    let x = start.x;
    let y = start.y;
    const ox = round1(x);
    const oy = round1(y);
    const pts: Array<[number, number]> = [[round1(x), round1(y)]];
    // Hand-drawn-lightning character (see reference): long, near-straight runs
    // punctuated by a few SHARP angular jogs — not a uniform fine jitter. Each
    // segment is either a "run" (mostly vertical, small lateral) or a "jog"
    // (short, big sideways kick that flips side), which yields crisp elbows.
    const steps = 5 + Math.floor(rng() * 3); // 5 – 7 big segments
    let sign: number = dir;
    for (let k = 0; k < steps; k++) {
      const run = rng() < 0.58; // mix of long runs and sharp short jogs
      const up = run ? 42 + rng() * 56 : 14 + rng() * 22; // vertical travel
      if (k > 0 && rng() < 0.72) sign *= -1; // sharp direction reversal
      const lateralMag = run ? 6 + rng() * 18 : 26 + rng() * 32;
      const lateral = lateralMag * sign + (5 + rng() * 8) * dir; // net outward
      x += lateral;
      y -= up;
      pts.push([round1(x), round1(y)]);
    }
    // Sharp pointed tip: one short fine continuation in the current heading.
    const tipDx = (x - pts[pts.length - 2][0]) * (0.35 + rng() * 0.25);
    const tipDy = (y - pts[pts.length - 2][1]) * (0.35 + rng() * 0.25);
    pts.push([round1(x + tipDx), round1(y + tipDy)]);
    const d = pts.map((p, idx) => (idx === 0 ? `M${p[0]} ${p[1]}` : ` L${p[0]} ${p[1]}`)).join("");

    // Most bolts split off a short, sharply-kinked branch part way up — like the
    // small forks in the reference. Rendered as its own thin tapered filament.
    let fork: string | undefined;
    if (rng() < 0.75 && pts.length > 4) {
      const fi = 1 + Math.floor(rng() * (pts.length - 3));
      let fx = pts[fi][0];
      let fy = pts[fi][1];
      let fsign: number = rng() < 0.5 ? -1 : 1;
      const fsteps = 2 + Math.floor(rng() * 2); // short branch
      let fd = `M${fx} ${fy}`;
      for (let k = 0; k < fsteps; k++) {
        const flong = k === 0 || rng() < 0.5;
        fx += (flong ? 10 + rng() * 16 : 22 + rng() * 22) * fsign;
        fy -= flong ? 22 + rng() * 26 : 10 + rng() * 14;
        fd += ` L${round1(fx)} ${round1(fy)}`;
        fsign *= -1;
      }
      fork = fd;
    }

    arcs.push({
      id: `bolt-${i}`,
      d,
      fork,
      color: sampleTrunkColor(t0), // matches the trunk where it originates
      width: 0.8 + rng() * 0.9,
      ox,
      oy,
      flashR: 13 + rng() * 9, // 13 – 22: small, crisp touch flash
      dur: 20 + rng() * 16, // 20 – 36s cycle: infrequent strikes
      delay: -(rng() * 36), // scatter across the cycle
    });
  }
  return arcs;
}

export const lightningArcs: LightningArc[] = buildLightning();

// ---------------------------------------------------------------------------
// Experience branches
// Branches are NOT separate shapes stuck onto the trunk — they are grown from
// the SAME live spine geometry. Each branch emerges tangent to the trunk
// (so its base reads as a continuation of the spine), gently sweeps outward,
// then curves back UP in the spine's growth direction, ending close to the
// spine with its tip pointing upward — matching the reference. They are filled
// at render time with the trunk #trunkLife / #trunkCore / #trunkHalo gradients,
// so a branch samples the EXACT trunk colour at its height.
// ---------------------------------------------------------------------------

export type BranchStrand = {
  id: string;
  body: string; // tapering filled ribbon — thick where it joins the spine, sharp tip
  core: string; // narrower white-hot ribbon down the centre
};

export type Pt2 = { x: number; y: number };

// Deterministic per-branch seed so each branch is unique but stable across
// renders/builds (no hydration mismatch).
function hashSeed(id: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

// Smooth a control polyline into a flowing centerline with a Catmull-Rom
// spline (per axis). This is what makes the branches read as organic, flowing
// plasma rather than a single stiff arc.
function smoothPolyline(pts: Pt2[], per = 10): Pt2[] {
  if (pts.length < 3) return pts.slice();
  const out: Pt2[] = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    for (let j = 0; j < per; j++) {
      const u = j / per;
      out.push({
        x: catmullRom(p0.x, p1.x, p2.x, p3.x, u),
        y: catmullRom(p0.y, p1.y, p2.y, p3.y, u),
      });
    }
  }
  out.push(pts[pts.length - 1]);
  return out;
}

// Turn a centerline into a filled ribbon whose half-width tapers from wBase
// (start) to wTip (end) so each filament is thick where it sprouts and
// razor-thin at the tip — the same taper the trunk uses.
function branchRibbon(pts: Pt2[], wBase: number, wTip: number, ease = 0.7): string {
  const n = pts.length;
  if (n < 2) return "";
  const left: Pt2[] = [];
  const right: Pt2[] = [];
  for (let i = 0; i < n; i++) {
    const a = pts[Math.max(0, i - 1)];
    const b = pts[Math.min(n - 1, i + 1)];
    let nx = -(b.y - a.y);
    let ny = b.x - a.x;
    const nl = Math.hypot(nx, ny) || 1;
    nx /= nl;
    ny /= nl;
    const u = i / (n - 1);
    const half = (wBase + (wTip - wBase) * Math.pow(u, ease)) / 2;
    left.push({ x: pts[i].x + nx * half, y: pts[i].y + ny * half });
    right.push({ x: pts[i].x - nx * half, y: pts[i].y - ny * half });
  }
  let d = `M${round1(left[0].x)} ${round1(left[0].y)}`;
  for (let i = 1; i < n; i++) d += `L${round1(left[i].x)} ${round1(left[i].y)}`;
  for (let i = n - 1; i >= 0; i--) d += `L${round1(right[i].x)} ${round1(right[i].y)}`;
  return d + "Z";
}

// A branch is now described by an editable control polyline (`points`) plus a
// base width. The flowing centerline + tapering ribbons are derived from these
// points, so the drag editor and the static render share one source of truth.
export type BranchControl = { id: string; baseW: number; points: Pt2[] };

// Vertical band of the trunk the branches attach across (t: 0 = base, 1 = crown).
// Shifted lower down the trunk so the branches fill the empty space near the
// base rather than crowding the crown.
const BRANCH_T_LOW = 0.15; // lowest branch — just above the root flare
const BRANCH_T_HIGH = 0.72; // highest branch
const BRANCH_BASE_W = 4.8;

// Procedurally seed each branch's control points: a polyline that sweeps
// outward (`dir`) and climbs, with a small deterministic per-point wobble so
// each branch is unique but stable across renders. These are the defaults the
// drag editor starts from; hand-tuned shapes live in BRANCH_OVERRIDES below.
function computeBranchControls(): BranchControl[] {
  const left = experiences.filter((e) => e.side === "left");
  const right = experiences.filter((e) => e.side === "right");
  const out: BranchControl[] = [];

  const grow = (list: typeof experiences, dir: number) => {
    list.forEach((e, i) => {
      const f = list.length <= 1 ? 0.5 : i / (list.length - 1);
      const t = BRANCH_T_LOW + f * (BRANCH_T_HIGH - BRANCH_T_LOW);
      const base = trunkSpine(clamp(t, 0, 1));
      const rng = mulberry32(hashSeed(e.id));
      const w = () => rng() - 0.5;
      const ax = base.x;
      const ay = base.y;
      const reach = 150 + 64 * f;
      const rise = 122 + 58 * f;
      const points: Pt2[] = [
        { x: round1(ax), y: round1(ay) },
        { x: round1(ax + dir * reach * 0.14 + w() * 6), y: round1(ay - rise * 0.3 + w() * 8) },
        { x: round1(ax + dir * reach * 0.54 + w() * 12), y: round1(ay - rise * 0.56 + w() * 12) },
        { x: round1(ax + dir * reach * 0.86 + w() * 12), y: round1(ay - rise * 0.82 + w() * 12) },
        { x: round1(ax + dir * reach * 0.94 + w() * 8), y: round1(ay - rise + w() * 8) },
      ];
      out.push({ id: `branch-${e.id}`, baseW: BRANCH_BASE_W, points });
    });
  };

  grow(left, -1);
  grow(right, 1);
  return out;
}

// Hand-tuned control points exported from the drag editor (?edit=1). If an id
// is present here, its points replace the procedurally-generated defaults.
const BRANCH_OVERRIDES: Record<string, Pt2[]> = {
  "branch-virginia-tech-vision-lab": [{ x: 445.3, y: 881.5 }, { x: 451.8, y: 769.5 }, { x: 431.3, y: 712.3 }, { x: 384.9, y: 690.3 }, { x: 343, y: 700.3 }],
  "branch-deep-fake-ear": [{ x: 526.7, y: 524.5 }, { x: 403.1, y: 481.2 }, { x: 338.8, y: 435 }, { x: 306.5, y: 392 }, { x: 301.6, y: 364.1 }],
  "branch-weill-cornell-computational-biology": [{ x: 425.8, y: 372.1 }, { x: 425, y: 305.1 }, { x: 402.9, y: 260.2 }, { x: 369.9, y: 233 }, { x: 338.8, y: 224.4 }],
  "branch-cpp-ml-library": [{ x: 464.7, y: 932.2 }, { x: 472.5, y: 870.8 }, { x: 514, y: 812.2 }, { x: 579.6, y: 780.9 }, { x: 626.5, y: 774.4 }],
  "branch-tumor-diagnosis": [{ x: 541.1, y: 652.7 }, { x: 581.6, y: 582.5 }, { x: 628.3, y: 545.2 }, { x: 667.9, y: 533.2 }, { x: 695.2, y: 533.5 }],
  "branch-cornell-auv": [{ x: 426.4, y: 387 }, { x: 454.8, y: 348.4 }, { x: 497, y: 310.4 }, { x: 545.1, y: 287.5 }, { x: 578.1, y: 280.6 }],
  "branch-investcorp-cornell-generative-ai": [{ x: 480.1, y: 182.1 }, { x: 463, y: 136.9 }, { x: 445.2, y: 109.2 }, { x: 425.3, y: 90.9 }, { x: 403.2, y: 80.2 }],
};

export const branchControls: BranchControl[] = computeBranchControls().map((c) =>
  BRANCH_OVERRIDES[c.id] ? { ...c, points: BRANCH_OVERRIDES[c.id] } : c,
);

// Tip (final control point) of each branch's hand-tuned shape, keyed by the
// experience id. Lets the orbs + labels in treeBranches sit exactly at the end
// of the plasma branch instead of using a separate procedural position.
export const branchTips: Record<string, Pt2> = Object.fromEntries(
  branchControls.map((c) => [c.id.replace(/^branch-/, ""), c.points[c.points.length - 1]]),
);

// Derive the flowing centerline + tapering body/core ribbons from a control set.
export function branchStrandFromControls(c: BranchControl): BranchStrand {
  const center = smoothPolyline(c.points, 10);
  return {
    id: c.id,
    body: branchRibbon(center, c.baseW, Math.max(0.08, c.baseW * 0.03)),
    core: branchRibbon(center, c.baseW * 0.42, 0),
  };
}

export const branchStrands: BranchStrand[] = branchControls.map(branchStrandFromControls);

// ---------------------------------------------------------------------------
// Branch halo grain
// The same dense field of tiny multicolored "pixels" the trunk uses (see
// buildTrunkHaloPixels), packed tightly around each branch centerline so the
// filaments read as grainy plasma that grows out of the spine — not flat
// ribbons. The band is widest where the branch sprouts from the trunk (so its
// grain blends seamlessly into the trunk grain) and tapers to a razor tip.
// ---------------------------------------------------------------------------
export type BranchHaloPixel = TrunkHaloPixel;

function buildBranchHalo(c: BranchControl): BranchHaloPixel[] {
  const center = smoothPolyline(c.points, 16);
  const n = center.length;
  if (n < 2) return [];
  const rng = mulberry32(hashSeed(c.id) ^ 0x5f3759df);
  const pix: BranchHaloPixel[] = [];
  for (let i = 0; i < n; i++) {
    const a = center[Math.max(0, i - 1)];
    const b = center[Math.min(n - 1, i + 1)];
    let nx = -(b.y - a.y);
    let ny = b.x - a.x;
    const nl = Math.hypot(nx, ny) || 1;
    nx /= nl;
    ny /= nl;
    const u = i / (n - 1); // 0 = root (on the spine), 1 = tip
    // Band hugs the branch: ~10px half-width at the root, razor-thin at the tip.
    const halfW = 2.4 + 7.6 * Math.pow(1 - u, 1.3);
    // Dense near the root where it blends into the spine, thinning toward the tip.
    const perStep = 1 + Math.floor(rng() * (3 - 1.4 * u));
    for (let k = 0; k < perStep; k++) {
      // Cluster density toward the centerline so the core stays the brightest.
      const frac = Math.pow(rng(), 1.5);
      const side = rng() < 0.5 ? -1 : 1;
      const off = side * frac * halfW + (rng() - 0.5) * 1.0;
      const x = center[i].x + nx * off;
      const y = center[i].y + ny * off;
      // Colour by distance from the core: white/cyan -> blue -> violet.
      let hue: BranchHaloPixel["hue"];
      if (frac < 0.3) hue = rng() < 0.6 ? "white" : "cyan";
      else if (frac < 0.64) hue = rng() < 0.58 ? "blue" : "cyan";
      else hue = rng() < 0.52 ? "violet" : "blue";
      const r = 0.3 + rng() * (0.74 - 0.3 * frac) * (1 - 0.18 * u);
      const opacity = clamp(0.4 + rng() * 0.48 - frac * 0.14, 0.13, 0.94);
      pix.push({ x: round1(x), y: round1(y), r: round1(r), hue, opacity });
    }
  }
  return pix;
}

export const branchHaloPixels: { id: string; pixels: BranchHaloPixel[] }[] =
  branchControls.map((c) => ({ id: c.id, pixels: buildBranchHalo(c) }));

// ---------------------------------------------------------------------------
// Branch filaments
// A few hair-thin wisps that follow each branch centerline with a slight
// perpendicular wobble — the same crackle-strand idea the trunk uses, but kept
// deliberately sparse and low-opacity so the branches stay subtle next to the
// spine. Amplitude eases out toward the tip so the wisps converge to a point.
// ---------------------------------------------------------------------------
export type BranchFilament = { d: string; width: number; opacity: number; soft: boolean };

function branchFilamentPath(center: Pt2[], amp: number, twist: number, phase: number, baseOff: number): string {
  const n = center.length;
  let d = "";
  for (let i = 0; i < n; i++) {
    const a = center[Math.max(0, i - 1)];
    const b = center[Math.min(n - 1, i + 1)];
    let nx = -(b.y - a.y);
    let ny = b.x - a.x;
    const nl = Math.hypot(nx, ny) || 1;
    nx /= nl;
    ny /= nl;
    const u = i / (n - 1);
    const taper = Math.pow(1 - u, 0.8); // shrink toward the tip
    const off = (baseOff + amp * Math.sin(u * Math.PI * twist + phase)) * taper;
    const x = center[i].x + nx * off;
    const y = center[i].y + ny * off;
    d += i === 0 ? `M${round1(x)} ${round1(y)}` : ` L${round1(x)} ${round1(y)}`;
  }
  return d;
}

function buildBranchFilaments(c: BranchControl): BranchFilament[] {
  const center = smoothPolyline(c.points, 16);
  if (center.length < 2) return [];
  const rng = mulberry32(hashSeed(c.id) ^ 0x1b873593);
  const out: BranchFilament[] = [];
  const COUNT = 18; // dense wisps so each branch crackles like the spine
  for (let k = 0; k < COUNT; k++) {
    const soft = rng() < 0.22;
    out.push({
      d: branchFilamentPath(
        center,
        (soft ? 3 : 1.6) + rng() * (soft ? 3 : 2.4),
        2.4 + rng() * 2.6,
        rng() * Math.PI * 2,
        (rng() - 0.5) * (soft ? 3 : 2),
      ),
      width: soft ? 0.8 + rng() * 0.6 : 0.46 + rng() * 0.46,
      opacity: (soft ? 0.34 : 0.56) + rng() * 0.26,
      soft,
    });
  }
  return out;
}

export const branchFilaments: { id: string; strands: BranchFilament[] }[] =
  branchControls.map((c) => ({ id: c.id, strands: buildBranchFilaments(c) }));
