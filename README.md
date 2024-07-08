# AWS-boilerplate-stepFunction-loop

### Service Description

This project, `my-step-function-loop`, is a Serverless application deployed on AWS using Step Functions to orchestrate a process involving two Lambda functions and an iterative loop.

### Configuration

#### Used Plugins
- `serverless-step-functions`: Enables defining Step Functions workflows directly in the `serverless.yml` file.

#### AWS Provider
- **Name**: aws
- **Runtime**: nodejs16.x
- **Region**: eu-west-3

### Lambda Functions

1. **init_lambda**
   - **Handler**: `lambdas/handler_lambda.init`
   - **Timeout**: 30 seconds

2. **process_lambda**
   - **Handler**: `lambdas/handler_lambda.process`
   - **Timeout**: 30 seconds

3. **iterator_lambda**
   - **Handler**: `lambdas/iterator_lambda.iterate`
   - **Timeout**: 30 seconds

### Step Functions

#### State Machine: `myWorkshopLoopStateMachine`

This state machine orchestrates the workflow using the defined Lambda functions.

##### Definition

```yaml
StartAt: initLambda
States:
  initLambda:
    Type: Task
    Resource: Fn::GetAtt: [init_lambda, Arn]
    Next: loop
  loop:
    Type: Task
    Resource: Fn::GetAtt: [iterator_lambda, Arn]
    Next: loopAgain?
  loopAgain?:
    Type: Choice
    Choices:
      - Variable: $.iterator.continue
        BooleanEquals: true
        Next: processLambda
    Default: endOfJob
  processLambda:
    Type: Task
    Resource: Fn::GetAtt: [process_lambda, Arn]
    Next: loop
  endOfJob:
    Type: Pass
    End: true
```

### Expected Input

The expected input JSON for this service is:

```json
{
  "word": "test"
}
```

### Deployment

To deploy this service, ensure you have set up your AWS credentials and have Serverless framework installed.

1. Clone this Git repository.
2. Ensure Serverless is installed locally (`npm install -g serverless`).
3. Deploy using the command: `serverless deploy`