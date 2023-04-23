import Ship from './ship';

test('passing 0-4 to the constructor creates legal ships with 0 hits', () => {
  for (let i = 0; i < 5; i += 1) {
    const ship = new Ship(i);
    expect(ship.getLength()).toBeGreaterThanOrEqual(2);
    expect(ship.getLength()).toBeLessThanOrEqual(5);
    expect(ship.getName()).not.toBe('Illegal ship');
    expect(ship.getHits()).toBe(0);
  }
});

test('passing values other than 0-4 creates an illegal ship', () => {
  let ship = new Ship(5);
  expect(ship.getLength()).toBe(0);
  expect(ship.getName()).toBe('Illegal ship');
  ship = new Ship('String');
  expect(ship.getLength()).toBe(0);
  expect(ship.getName()).toBe('Illegal ship');
  ship = new Ship();
  expect(ship.getLength()).toBe(0);
  expect(ship.getName()).toBe('Illegal ship');
  ship = new Ship(true);
  expect(ship.getLength()).toBe(0);
  expect(ship.getName()).toBe('Illegal ship');
});

test('calling hit() raises hit count by one', () => {
  const ship = new Ship(4);
  expect(ship.getHits()).toBe(0);
  ship.hit();
  expect(ship.getHits()).toBe(1);
  ship.hit();
  expect(ship.getHits()).toBe(2);
});

test('calling hit() doesn\'t raise hit count beyond length', () => {
  const ship = new Ship(0);
  expect(ship.getHits()).toBe(0);
  ship.hit();
  ship.hit();
  ship.hit();
  ship.hit();
  ship.hit();
  expect(ship.getHits()).toBe(5);
  ship.hit();
  expect(ship.getHits()).toBe(5);
});

test('isSunk() is true after correct amount of hits', () => {
  const ship = new Ship(3);
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  expect(ship.isSunk()).toBe(false);
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});
