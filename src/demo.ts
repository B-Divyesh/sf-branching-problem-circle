import { makeBranch, makeCircle, type CircleSession } from './types';

/** Original, rights-cleared sample written for the product demo. */
export function makeDemoCircle(): CircleSession {
  const circle = makeCircle();
  circle.id = 'demo-hexagon-corners';
  circle.title = 'A hexagon has six corners';
  circle.problem = 'Place the numbers 1 through 6 at the corners of a hexagon. Can every side have a different sum?';
  circle.source = 'Original sample for Branching Problem Circle';
  circle.rightsConfirmed = true;
  circle.phase = 'explore';
  const arrange = makeBranch();
  arrange.id = 'demo-arrange'; arrange.title = 'Draw and arrange';
  arrange.firstStep = 'Write the six corner positions, then place 1 and 6 opposite each other.';
  arrange.hint = 'Each corner belongs to two side sums.';
  arrange.path = 'Try one arrangement, list all six side sums, and swap two corners. Notice which sums change together.';
  arrange.votes = 3; arrange.hintRevealed = true; arrange.pathRevealed = true;
  arrange.rationales = [{ id: 'demo-r1', text: 'A picture will help us keep track of shared corners.', createdAt: 1 }];
  const total = makeBranch();
  total.id = 'demo-total'; total.title = 'Use the total twice';
  total.firstStep = 'Add all six side sums before choosing any numbers.';
  total.hint = 'Every corner number appears in exactly two side sums.';
  total.path = 'The side-sum total is twice 1 + 2 + 3 + 4 + 5 + 6, or 42. Use that constraint to test arrangements.';
  total.votes = 2; total.rationales = [{ id: 'demo-r2', text: 'The repeated counting may limit what the sums can be.', createdAt: 2 }];
  const test = makeBranch();
  test.id = 'demo-test'; test.title = 'Test a small pattern';
  test.firstStep = 'Put odd and even numbers around the hexagon in an alternating pattern.';
  test.hint = 'Compare the parity of neighboring sums.';
  test.path = 'Alternating parity makes every side sum odd. Change one pair and see whether six distinct sums become possible.';
  test.votes = 1;
  circle.branches = [arrange, total, test];
  circle.alternativeIdeas = [{ id: 'demo-alt', text: 'Could we make a table of every possible neighbor pair?', createdAt: 3 }];
  return circle;
}
