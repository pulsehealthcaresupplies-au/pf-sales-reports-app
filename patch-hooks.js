const fs = require('fs');
const path = require('path');

const hooksPath = path.join(__dirname, 'src/lib/graphql/generated/hooks.ts');
let content = fs.readFileSync(hooksPath, 'utf8');

const typesToQualify = [
    'LoginMutation',
    'LoginMutationVariables',
    'RefreshTokenMutation',
    'RefreshTokenMutationVariables',
    'LogoutMutation',
    'LogoutMutationVariables',
    'GetCurrentUserQuery',
    'GetCurrentUserQueryVariables',
    'GetSalesReportQuery',
    'GetSalesReportQueryVariables',
    'GetCustomerReportQuery',
    'GetCustomerReportQueryVariables',
    'GetProductPerformanceReportQuery',
    'GetProductPerformanceReportQueryVariables',
    'GetCreditReportQuery',
    'GetCreditReportQueryVariables',
    'GetOverdueCustomersQuery',
    'GetOverdueCustomersQueryVariables',
    'GetDueSoonCustomersQuery',
    'GetDueSoonCustomersQueryVariables',
    'GetCreditSummaryQuery',
    'GetCreditSummaryQueryVariables'
];

typesToQualify.forEach(type => {
    const regex = new RegExp(`\\b${type}\\b`, 'g');
    content = content.replace(regex, `Types.${type}`);
});

// Fix double prefixing if any (e.g. Types.Types.LoginMutation) - though simplistic replace shouldn't cause it if carefully done,
// but better to specific replacements.
// A more robust way: replace matches that are NOT preceded by "Types."
// But simpler to just run it once.
// And fix usage in strings? No, the regex boundaries help.

fs.writeFileSync(hooksPath, content);
console.log('Updated hooks.ts with Types prefixes');
