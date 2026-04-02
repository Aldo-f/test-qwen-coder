import { gql } from '@apollo/client';

export const GET_TOOLS = gql`
  query GetTools {
    tools {
      id
      name
      description
      category
      icon
      url
    }
  }
`;

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories
  }
`;

export const SEARCH_TOOLS = gql`
  query SearchTools($query: String!) {
    searchTools(query: $query) {
      id
      name
      description
      category
      icon
      url
    }
  }
`;

export const GET_TOOLS_BY_CATEGORY = gql`
  query GetToolsByCategory($category: String!) {
    toolsByCategory(category: $category) {
      id
      name
      description
      category
      icon
      url
    }
  }
`;
