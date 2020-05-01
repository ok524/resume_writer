import { pages } from './links';

const getPageByName = name => {
    if (name) {
        return pages.find(page => page.name.toLowerCase() === name.toLowerCase());
    } else {
        return pages[0];
    }
};

const getPageById = id => {
    return pages.find(page => page.id.toString() === id.toString());
};

export { getPageByName, getPageById };
