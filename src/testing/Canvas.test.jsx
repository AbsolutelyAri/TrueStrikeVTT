/**
 * @jest-environment node
 */

/**
 * Stolen from the firebase docs, then heavily modified
 */
import { describe, test, fit, beforeEach, beforeAll, afterAll, expect } from '@jest/globals';
import { initializeTestEnvironment, RulesTestEnvironment, assertFails } from '@firebase/rules-unit-testing';
import { getDatabaseCoverageMeta, expectDatabasePermissionDenied, expectDatabasePermissionUpdateSucceeds, expectPermissionGetSucceeds } from './utils';
import { readFileSync, createWriteStream } from "node:fs";
import http from "node:http";
import { resolve } from 'node:path';
import { ref, get, update } from 'firebase/database';

import { firebaseConfig } from "../game/firebase"

let testEnv;

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: "demo-truestrikevtt",
    database: {
      port: "9000",
      host: "127.0.0.1",
      rules: readFileSync('database.rules.json', 'utf8')
    },
  });
});

afterAll(async () => {
  await testEnv?.cleanup();
});

beforeEach(async () => {
  testEnv.clearDatabase();
});

// If you want to define global variables for Rules Test Contexts to save some
// typing, make sure to initialize them for *every test* to avoid cache issues.
//
//     let unauthedDb;
//     beforeEach(() => {
//       unauthedDb = testEnv.unauthenticatedContext().database();
//     });
//
// Or you can just create them inline to make tests self-contained like below.

describe("Database Read and Write", () => {
    test('Authenticated users can write', async () => {
        const testerAndyDb = testEnv.authenticatedContext('tester-andy').database();
        await expectDatabasePermissionUpdateSucceeds(update(ref(testerAndyDb, 'Campaigns/AndyCampaign/token'), { x_coord: 64 }));
        
    });
  
    // test('should not allow users to read from a random collection', async () => {
    //   const unauthedDb = testEnv.unauthenticatedContext().database();
    //   await expect(assertFails(get(ref(unauthedDb, 'foo/bar')))).resolves;
    //   // await expectDatabasePermissionDenied(get(ref(unauthedDb, 'foo/bar')));
    // });
  
    // test("should ONLY allow users to modify their own profiles", async () => {
      
    //   const unauthedDb = testEnv.unauthenticatedContext().database();
  
    //   await expectDatabasePermissionUpdateSucceeds(update(ref(aliceDb, 'users/alice'), { favorite_color: "blue" }));
    //   await expectDatabasePermissionDenied(update(ref(aliceDb, 'users/bob'), { favorite_color: "red" }));
    //   await expectDatabasePermissionDenied(update(ref(unauthedDb, 'users/alice'), { favorite_color: "orange" }));
    // });
});
