import SwiftUI

struct ContentView: View {
    @State private var counter = 0

    var body: some View {
        VStack(spacing: 20) {
            Text("Counter: \(counter)")
                .font(.largeTitle)
                .accessibility(identifier: "CounterLabel")
            HStack {
                Button("Increment") {
                    counter += 1
                }
                .accessibility(identifier: "Increment")
                .padding()
                Button("Decrement") {
                    counter -= 1
                }
                .accessibility(identifier: "Decrement")
                .padding()
                Button("Initial") {
                    counter = 0
                }
                .accessibility(identifier: "Initial")
                .padding()
            }
        }
        .padding()
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
