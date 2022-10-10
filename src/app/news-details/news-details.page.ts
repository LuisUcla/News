import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.page.html',
  styleUrls: ['./news-details.page.scss'],
})
export class NewsDetailsPage implements OnInit {

  news: any = {};

  constructor(private router: Router) { }

  ngOnInit() {
    this.getNewsDetails();
  }

  getNewsDetails() {
    this.news = this.router.getCurrentNavigation().extras.state.new;
    console.log(this.news);
  }

}
