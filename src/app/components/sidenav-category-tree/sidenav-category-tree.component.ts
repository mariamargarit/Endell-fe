import { Component, OnInit } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { files } from './example-data';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category.model';

/** File node data with possible child nodes. */
export interface FileNode {
  name: string;
  type: string;
  children?: FileNode[];
}

/**
 * Flattened tree node that has been created from a FileNode through the flattener. Flattened
 * nodes include level index and whether they can be expanded or not.
 */
export interface FlatTreeNode {
  name: string;
  level: number;
  expandable: boolean;
}

@Component({
  selector: 'app-sidenav-category-tree',
  templateUrl: './sidenav-category-tree.component.html',
  styleUrls: ['./sidenav-category-tree.component.css']
})
export class SidenavCategoryTreeComponent implements OnInit{

  /** The TreeControl controls the expand/collapse state of tree nodes.  */
  treeControl: FlatTreeControl<FlatTreeNode>;

  /** The TreeFlattener is used to generate the flat list of items from hierarchical data. */
  treeFlattener: MatTreeFlattener<Category, FlatTreeNode>;

  /** The MatTreeFlatDataSource connects the control and flattener to provide data. */
  dataSource: MatTreeFlatDataSource<Category, FlatTreeNode>;

  constructor(private categoryService: CategoryService) {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      this.getChildren);

    this.treeControl = new FlatTreeControl(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    // this.dataSource.data = files;
  }
  ngOnInit(): void {
    this.getCategories();
  }

  /** Transform the data to something the tree can read. */
  transformer(node: Category, level: number): FlatTreeNode {
    return {
      name: node.name!,
      level,
      expandable: !!node.subcategories
    };
  }

  /** Get the level of the node */
  getLevel(node: FlatTreeNode): number {
    return node.level;
  }

  /** Get whether the node is expanded or not. */
  isExpandable(node: FlatTreeNode): boolean {
    return node.expandable;
  }

  /** Get whether the node has children or not. */
  hasChild(index: number, node: FlatTreeNode): boolean {
    return node.expandable;
  }

  /** Get the children for the node. */
  getChildren(node: Category): Category[] | null | undefined {
    return node.subcategories;
  }

  getCategories(){
    this.categoryService.getCategories()
      .subscribe((res)=>{
        console.log(res);
        this.dataSource.data = res;
      })
  }
}
