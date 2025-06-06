import type { Table, ForeignKey } from '@/types/database'
import { SQLDataType } from '@/types/database'

// Sample tables for demonstration purposes
export const sampleTables: Table[] = [
  {
    id: 'users_table',
    name: 'users',
    columns: [
      {
        id: 'user_id',
        name: 'id',
        dataType: SQLDataType.INT,
        nullable: false,
        primaryKey: true,
        autoIncrement: true,
      },
      {
        id: 'user_email',
        name: 'email',
        dataType: SQLDataType.VARCHAR,
        length: 255,
        nullable: false,
        primaryKey: false,
        autoIncrement: false,
      },
      {
        id: 'user_name',
        name: 'name',
        dataType: SQLDataType.VARCHAR,
        length: 100,
        nullable: false,
        primaryKey: false,
        autoIncrement: false,
      },
      {
        id: 'user_created_at',
        name: 'created_at',
        dataType: SQLDataType.TIMESTAMP,
        nullable: false,
        primaryKey: false,
        autoIncrement: false,
      },
    ],
    position: { x: 100, y: 100 },
  },
  {
    id: 'posts_table',
    name: 'posts',
    columns: [
      {
        id: 'post_id',
        name: 'id',
        dataType: SQLDataType.INT,
        nullable: false,
        primaryKey: true,
        autoIncrement: true,
      },
      {
        id: 'post_user_id',
        name: 'user_id',
        dataType: SQLDataType.INT,
        nullable: false,
        primaryKey: false,
        autoIncrement: false,
      },
      {
        id: 'post_title',
        name: 'title',
        dataType: SQLDataType.VARCHAR,
        length: 255,
        nullable: false,
        primaryKey: false,
        autoIncrement: false,
      },
      {
        id: 'post_content',
        name: 'content',
        dataType: SQLDataType.TEXT,
        nullable: true,
        primaryKey: false,
        autoIncrement: false,
      },
      {
        id: 'post_published',
        name: 'published',
        dataType: SQLDataType.BOOLEAN,
        nullable: false,
        primaryKey: false,
        autoIncrement: false,
      },
    ],
    position: { x: 450, y: 100 },
  },
  {
    id: 'comments_table',
    name: 'comments',
    columns: [
      {
        id: 'comment_id',
        name: 'id',
        dataType: SQLDataType.INT,
        nullable: false,
        primaryKey: true,
        autoIncrement: true,
      },
      {
        id: 'comment_post_id',
        name: 'post_id',
        dataType: SQLDataType.INT,
        nullable: false,
        primaryKey: false,
        autoIncrement: false,
      },
      {
        id: 'comment_user_id',
        name: 'user_id',
        dataType: SQLDataType.INT,
        nullable: false,
        primaryKey: false,
        autoIncrement: false,
      },
      {
        id: 'comment_content',
        name: 'content',
        dataType: SQLDataType.TEXT,
        nullable: false,
        primaryKey: false,
        autoIncrement: false,
      },
    ],
    position: { x: 275, y: 350 },
  },
]

// Sample foreign key relationships
export const sampleForeignKeys: ForeignKey[] = [
  {
    id: 'fk_posts_users',
    sourceTableId: 'posts_table',
    sourceColumnId: 'post_user_id',
    targetTableId: 'users_table',
    targetColumnId: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  {
    id: 'fk_comments_posts',
    sourceTableId: 'comments_table',
    sourceColumnId: 'comment_post_id',
    targetTableId: 'posts_table',
    targetColumnId: 'post_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  {
    id: 'fk_comments_users',
    sourceTableId: 'comments_table',
    sourceColumnId: 'comment_user_id',
    targetTableId: 'users_table',
    targetColumnId: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
]

// Alternative smaller sample for embedded demos
export const simpleSampleTables: Table[] = [
  {
    id: 'users_simple',
    name: 'users',
    columns: [
      {
        id: 'user_id_simple',
        name: 'id',
        dataType: SQLDataType.INT,
        nullable: false,
        primaryKey: true,
        autoIncrement: true,
      },
      {
        id: 'user_email_simple',
        name: 'email',
        dataType: SQLDataType.VARCHAR,
        length: 255,
        nullable: false,
        primaryKey: false,
        autoIncrement: false,
      },
    ],
    position: { x: 100, y: 100 },
  },
  {
    id: 'orders_simple',
    name: 'orders',
    columns: [
      {
        id: 'order_id_simple',
        name: 'id',
        dataType: SQLDataType.INT,
        nullable: false,
        primaryKey: true,
        autoIncrement: true,
      },
      {
        id: 'order_user_id_simple',
        name: 'user_id',
        dataType: SQLDataType.INT,
        nullable: false,
        primaryKey: false,
        autoIncrement: false,
      },
    ],
    position: { x: 350, y: 100 },
  },
]

export const simpleSampleForeignKeys: ForeignKey[] = [
  {
    id: 'fk_orders_users_simple',
    sourceTableId: 'orders_simple',
    sourceColumnId: 'order_user_id_simple',
    targetTableId: 'users_simple',
    targetColumnId: 'user_id_simple',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
] 