import {Component, OnInit} from '@angular/core';
import {CommentService} from "../../../service/comment.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-comment',
  templateUrl: './list-comment.component.html',
  styleUrls: ['./list-comment.component.css']
})
export class ListCommentComponent implements OnInit {

  listComment: any;


  constructor(private httpClient: HttpClient,
              private commentService: CommentService,
              private router:Router) {
  }

  ngOnInit(): void {
    this.commentService.getAllComment().subscribe((data) => {
      console.log(data)
      this.listComment = data;
      this.router.navigate(["/detail-commnent"])
    }, error => {

    })
  }

}
