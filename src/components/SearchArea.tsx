import { Component, type ReactNode } from 'react';

export class SearchArea extends Component {
  render(): ReactNode {
    return (
      <div className="flex gap-2 bg-mist-50 p-4 border-b-2 border-b-mist-300">
        <input
          type="text"
          placeholder="Search..."
          className="px-2 rounded flex-1 border border-mist-200 focus:outline-none focus:ring-2 focus:ring-mist-300"
        />
        <button className="bg-mist-200 hover:bg-mist-300 cursor-pointer rounded h-8 w-30 border border-mist-300">
          Search
        </button>
      </div>
    );
  }
}
